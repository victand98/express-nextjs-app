import { Request, Response } from "express";
import { NotFoundError } from "../helpers/errors/not-found.error";
import { CustomRequest } from "../helpers/types";
import { Equipment, EquipmentAttrs } from "../models";

export const all = async (req: Request, res: Response) => {
  const equipments = await Equipment.find({}).populate("user");

  res.json(equipments);
};

export const one = async (req: Request, res: Response) => {
  const equipment = await Equipment.findById(req.params.id).populate("user");

  if (!equipment) throw new NotFoundError();

  res.json(equipment);
};

export const save = async (
  req: CustomRequest<EquipmentAttrs>,
  res: Response
) => {
  const equipment = Equipment.build(req.body);
  await equipment.save();

  res.status(201).json(equipment);
};

export const update = async (
  req: CustomRequest<EquipmentAttrs>,
  res: Response
) => {
  const equipment = await Equipment.findById(req.params.id);

  if (!equipment) throw new NotFoundError();

  equipment.set(req.body);
  await equipment.save();

  res.json(equipment);
};
