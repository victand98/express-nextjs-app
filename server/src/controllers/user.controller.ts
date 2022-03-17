import { Request, Response } from "express";
import { FilterQuery } from "mongoose";
import { telnetWrapper } from "../config/telnet";
import { BadRequestError } from "../helpers/errors/bad-request-error";
import { NotFoundError } from "../helpers/errors/not-found.error";
import { CustomRequest, Roles } from "../helpers/types";
import { Role, User, UserAttrs, UserDoc } from "../models";

export const all = async (req: Request, res: Response) => {
  const teacherRole = await Role.findOne({ name: Roles.teacher });
  let filter: FilterQuery<UserDoc> = {};
  if (req.currentUser?.role === teacherRole?.id) {
    const studentRole = await Role.findOne({ name: Roles.student });
    filter = {
      role: studentRole?.id,
    };
  }

  const users = await User.find(filter).populate("role");

  res.json(users);
};

export const one = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).populate("role");

  if (!user) throw new NotFoundError();

  res.json(user);
};

export const save = async (req: Request, res: Response) => {
  const roles = await Role.find({});

  if (roles.map((role) => role.id).includes(req.body.role)) {
    const totalUsers = await User.countDocuments({ role: { $in: roles } });
    const maxTotalUsers = 20;
    if (totalUsers > maxTotalUsers)
      throw new BadRequestError(
        `Solamente se puede registar hasta ${maxTotalUsers} usuarios`
      );
    await telnetWrapper.connect();
    await telnetWrapper.login();
    await telnetWrapper.write(`configure terminal\r\n`);
    await telnetWrapper.write(`service password-encryption\r\n`);
    const userRole = roles.find((role) => role.id === req.body.role);
    await telnetWrapper.write(
      `username ${req.body.firstName} password ${req.body.password} privilege ${userRole?.privilege}\r\n`
    );
    await telnetWrapper.closeConnection();
  }

  const user = User.build(req.body);
  await user.save();

  res.status(201).json();
};

export const update = async (req: CustomRequest<UserAttrs>, res: Response) => {
  const user = await User.findById(req.params.id);

  if (!user) throw new NotFoundError();

  if (req.body.role !== user.role) {
    const roles = await Role.find({});
    if (roles.map((role) => role.id).includes(req.body.role)) {
      const totalUsers = await User.countDocuments({ role: { $in: roles } });
      const maxTotalUsers = 20;
      if (totalUsers > maxTotalUsers)
        throw new BadRequestError(
          `Solamente se puede registar hasta ${maxTotalUsers} usuarios`
        );
      await telnetWrapper.connect();
      await telnetWrapper.login();
      await telnetWrapper.write(`configure terminal\r\n`);
      await telnetWrapper.write(`service password-encryption\r\n`);
      const userRole = roles.find((role) => role.id === req.body.role);
      await telnetWrapper.write(
        `username ${req.body.firstName} password ${req.body.password} privilege ${userRole?.privilege}\r\n`
      );
      await telnetWrapper.closeConnection();
    }
  }

  user.set(req.body);
  await user.save();

  res.json(user);
};

export const remove = async (req: CustomRequest<UserAttrs>, res: Response) => {
  const user = await User.findById(req.params.id);

  if (!user) throw new NotFoundError();

  const roles = await Role.find({}).distinct("_id");

  if (roles.map(String).includes(String(user.role))) {
    await telnetWrapper.connect();
    await telnetWrapper.login();
    await telnetWrapper.write(`configure terminal\r\n`);
    await telnetWrapper.write(`no username ${user.firstName}\r\n`);
    await telnetWrapper.closeConnection();
  }

  await user.remove();

  res.status(202).json();
};
