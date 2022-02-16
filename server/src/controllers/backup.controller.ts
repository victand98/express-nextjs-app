import path from "path";
import { Request, Response } from "express";
import { NotFoundError } from "../helpers/errors/not-found.error";
import { CustomRequest } from "../helpers/types";
import { Backup, BackupAttrs } from "../models";
import { connection } from "../config/telnet";

export const all = async (req: Request, res: Response) => {
  const backups = await Backup.find({});

  res.json(backups);
};

export const one = async (req: Request, res: Response) => {
  const backup = await Backup.findById(req.params.id);

  if (!backup) throw new NotFoundError();

  const backupFile = path.join(__dirname, "..", "public", backup.path);

  res.download(backupFile);
};

export const save = async (req: CustomRequest<BackupAttrs>, res: Response) => {
  const backup = Backup.build({ path: req.file?.filename! });
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

export const generate = async (
  req: CustomRequest<BackupAttrs>,
  res: Response
) => {
  const params = {
    host: "192.168.20.80",
    port: 23,
    shellPrompt: "",
    loginPrompt: /Username[: ]*$/i,
    passwordPrompt: /Password: /i,
  };
  await connection.connect(params);

  res.json({ message: "Backup generado con éxito" });
};
