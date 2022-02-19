import { Request, Response } from "express";
import mongoose, { ObjectId } from "mongoose";
import { telnetWrapper } from "../config/telnet";
import { BadRequestError } from "../helpers/errors/bad-request-error";
import { NotFoundError } from "../helpers/errors/not-found.error";
import { CustomRequest, Roles } from "../helpers/types";
import { Role, User, UserAttrs } from "../models";

export const all = async (req: Request, res: Response) => {
  const users = await User.find({}).populate("role");

  res.json(users);
};

export const one = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).populate("role");

  if (!user) throw new NotFoundError();

  res.json(user);
};

export const save = async (req: Request, res: Response) => {
  const roles = await Role.find({
    $or: [{ name: Roles.administrator }, { name: Roles.teacher }],
  });

  if (roles.map((role) => role.id).includes(req.body.role)) {
    const totalUsers = await User.countDocuments({ role: { $in: roles } });
    const maxTotalUsers = 15;
    if (totalUsers > maxTotalUsers)
      throw new BadRequestError(
        `Solamente se puede registar hasta ${maxTotalUsers} usuarios con roles: ${Roles.administrator}, ${Roles.teacher}`
      );
    await telnetWrapper.connect();
    await telnetWrapper.connection.write(`configure terminal\r\n`);
    await telnetWrapper.connection.write(`service password-encryption\r\n`);
    const userRole = roles.find((role) => role.id === req.body.role);
    await telnetWrapper.connection.write(
      `username ${req.body.email} password ${req.body.password} privilege ${userRole?.privilege}\r\n`
    );
  }

  const user = User.build(req.body);
  await user.save();

  res.status(201).json();
};

export const update = async (req: CustomRequest<UserAttrs>, res: Response) => {
  const user = await User.findById(req.params.id);

  if (!user) throw new NotFoundError();

  if (req.body.role !== user.role) {
    const roles = await Role.find({
      $or: [{ name: Roles.administrator }, { name: Roles.teacher }],
    });
    if (roles.map((role) => role.id).includes(req.body.role)) {
      const totalUsers = await User.countDocuments({ role: { $in: roles } });
      const maxTotalUsers = 15;
      if (totalUsers > maxTotalUsers)
        throw new BadRequestError(
          `Solamente se puede registar hasta ${maxTotalUsers} usuarios con roles: ${Roles.administrator}, ${Roles.teacher}`
        );
      await telnetWrapper.connect();
      await telnetWrapper.connection.write(`configure terminal\r\n`);
      await telnetWrapper.connection.write(`service password-encryption\r\n`);
      const userRole = roles.find((role) => role.id === req.body.role);
      await telnetWrapper.connection.write(
        `username ${req.body.email} password ${req.body.password} privilege ${userRole?.privilege}\r\n`
      );
    }
  }

  user.set(req.body);
  await user.save();

  res.json(user);
};

export const remove = async (req: CustomRequest<UserAttrs>, res: Response) => {
  const user = await User.findById(req.params.id);

  if (!user) throw new NotFoundError();

  const roles = await Role.find({
    $or: [{ name: Roles.administrator }, { name: Roles.teacher }],
  }).distinct("_id");

  if (roles.map(String).includes(String(user.role))) {
    await telnetWrapper.connect();
    await telnetWrapper.connection.write(`configure terminal\r\n`);
    await telnetWrapper.connection.write(`no username ${user.email}\r\n`);
  }

  await user.remove();

  res.status(202).json();
};
