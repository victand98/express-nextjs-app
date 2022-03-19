import { Request, Response } from "express";
import { NotFoundError } from "../helpers/errors/not-found.error";
import { Equipment, Nap } from "../models";

export const all = async (req: Request, res: Response) => {
  const naps = await Nap.find({});

  res.json(naps);
};

export const one = async (req: Request, res: Response) => {
  const nap = await Nap.findById(req.params.id);
  if (!nap) throw new NotFoundError();

  const equipments = await Equipment.find({ nap: nap.id }).populate("user");

  res.json({ nap, equipments });
};

export const save = async (req: Request, res: Response) => {
  const nap = Nap.build(req.body);
  await nap.save();

  res.status(201).json(nap);
};

export const update = async (req: Request, res: Response) => {
  const nap = await Nap.findById(req.params.id);

  if (!nap) throw new NotFoundError();

  nap.set(req.body);
  await nap.save();

  res.json(nap);
};
