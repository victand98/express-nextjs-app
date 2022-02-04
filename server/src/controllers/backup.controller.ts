import { Request, Response } from "express";
import { NotFoundError } from "../helpers/errors/not-found.error";
import { CustomRequest } from "../helpers/types";
import { Backup, BackupAttrs } from "../models";

export const all = async (req: Request, res: Response) => {
  const backups = await Backup.find({});

  res.json(backups);
};

export const one = async (req: Request, res: Response) => {
  const backup = await Backup.findById(req.params.id);

  if (!backup) throw new NotFoundError();

  res.json(backup);
};

export const save = async (req: CustomRequest<BackupAttrs>, res: Response) => {
  const backup = Backup.build(req.body);
  await backup.save();

  res.status(201).json(backup);
};

export const update = async (
  req: CustomRequest<BackupAttrs>,
  res: Response
) => {
  const backup = await Backup.findById(req.params.id);

  if (!backup) throw new NotFoundError();

  backup.set(req.body);
  await backup.save();

  res.json(backup);
};
