import { Request, Response } from "express";
import { NotFoundError } from "../helpers/errors/not-found.error";
import { Role } from "../models";

export const all = async (req: Request, res: Response) => {
  const roles = await Role.find({});

  res.json(roles);
};

export const one = async (req: Request, res: Response) => {
  const role = await Role.findOne({ name: req.params.name });

  if (!role) throw new NotFoundError();

  res.json(role);
};
