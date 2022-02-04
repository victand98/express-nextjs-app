import { Request, Response } from "express";
import { NotFoundError } from "../helpers/errors/not-found.error";
import { CustomRequest } from "../helpers/types";
import { User, UserAttrs } from "../models";

export const all = async (req: Request, res: Response) => {
  const users = await User.find({}).populate("role");

  res.json(users);
};

export const one = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).populate("role");

  if (!user) throw new NotFoundError();

  res.json(user);
};

export const save = async (req: CustomRequest<UserAttrs>, res: Response) => {
  const user = User.build(req.body);
  await user.save();

  res.status(201).json(user);
};

export const update = async (req: CustomRequest<UserAttrs>, res: Response) => {
  const user = await User.findById(req.params.id);

  if (!user) throw new NotFoundError();

  user.set(req.body);
  await user.save();

  res.json(user);
};
