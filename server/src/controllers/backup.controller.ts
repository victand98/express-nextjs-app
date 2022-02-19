import path from "path";
import { Request, Response } from "express";
import { NotFoundError } from "../helpers/errors/not-found.error";
import { CustomRequest } from "../helpers/types";
import { Backup, BackupAttrs } from "../models";
import { telnetWrapper } from "../config/telnet";

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
  await telnetWrapper.connect();
  await telnetWrapper.connection.write("write\r\n");
  await telnetWrapper.connection.write(
    "file upload cfg-startup startrun.sav ftp ip 192.168.108.12 user ftpserver password ftpserver\r\n"
  );
  res.json({ message: "Backup generado con éxito" });
};
