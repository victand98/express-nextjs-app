import { Request } from "express";

export enum Roles {
  administrator = "administrador",
  teacher = "docente",
  student = "estudiante",
  guest = "invitado",
}

export enum Resources {
  users = "usuarios",
  equipment = "equipos",
  backup = "respaldo",
  nap = "nap",
}

export interface CustomRequest<T> extends Request {
  body: T;
}
