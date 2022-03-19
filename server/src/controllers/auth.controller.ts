import { Request, Response } from "express";
import { Password } from "../helpers/Password";
import { Resource, Role, User } from "../models";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../helpers/errors/bad-request-error";
import { Roles } from "../helpers/types";

export const signin = async (req: Request, res: Response) => {
  const { password, username } = req.body;

  const user = await User.findOne({
    $or: [{ email: username }, { username }],
  }).populate("role");

  if (!user) throw new BadRequestError("Las credenciales no son válidas");

  const passwordsMatch = await Password.compare(user.password, password);

  if (!passwordsMatch)
    throw new BadRequestError("Las credenciales no son válidas");

  if (!user.status)
    throw new BadRequestError("Su cuenta se encuentra inactiva");

  // Generate JWT
  const userJWT = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role.id,
      roleName: user.role.name,
    },
    process.env.JWT_KEY!
  );

  // Store it on session object
  req.session = {
    jwt: userJWT,
  };

  res.status(200).json(user);
};

export const logout = (req: Request, res: Response) => {
  req.session = null;
  res.json({});
};

export const currentUser = (req: Request, res: Response) => {
  res.json({ currentUser: req.currentUser || null });
};

export const currentPermissions = async (req: Request, res: Response) => {
  const currentRole = req.currentUser?.role;

  let role = null;
  if (!currentRole) role = await Role.findOne({ name: Roles.guest });
  else role = await Role.findById(currentRole);

  const resources = await Resource.find({
    "roles.role": role?.id,
  }).select({
    name: 1,
    status: 1,
    roles: {
      $elemMatch: {
        role: role?.id,
      },
    },
  });

  return res.json(resources);
};
