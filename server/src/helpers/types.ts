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

export enum Plans {
  plan10M = "10M",
  plan15M = "15M",
  plan20M = "20M",
}

export interface CustomRequest<T> extends Request {
  body: T;
}
