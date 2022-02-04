import { NextFunction, Request, Response } from "express";

export const use =
  (fn: (req: Request, res: Response, next?: NextFunction) => any) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
