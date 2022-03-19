import { Roles } from "../helpers/types";
import { NapAttrs, RoleAttrs } from "../models";

export const initialRoles: RoleAttrs[] = [
  {
    name: Roles.administrator,
    privilege: 15,
    status: true,
  },
  {
    name: Roles.teacher,
    privilege: 10,
    status: true,
  },
  {
    name: Roles.student,
    privilege: 5,
    status: true,
  },
  {
    name: Roles.guest,
    privilege: 4,
    status: true,
  },
];

export const initialNaps: NapAttrs[] = [
  {
    name: "UPS-A01",
    location: "PLANTA FOTOVOLTAICA",
    status: true,
  },
  {
    name: "UPS-A02",
    location: "ESTADIO VALERIANO GAVINELLI BOVIO",
    status: true,
  },
  {
    name: "UPS-A03",
    location: "CANCHA SINTETICA",
    status: true,
  },
  {
    name: "UPS-A04",
    location: "EDIFICIO BOTASSO",
    status: true,
  },
  {
    name: "UPS-A05",
    location: "COLISEO UNIVERSITARIO",
    status: true,
  },
  {
    name: "UPS-A06",
    location: "ENTRADA A SECRETARIA",
    status: true,
  },
  {
    name: "UPS-A01",
    location: "PLANTA FOTOVOLTAICA",
    status: true,
  },
  {
    name: "UPS-A07",
    location: "LABORATORIO DE TELECOMUNICACIONES",
    status: true,
  },
  {
    name: "UPS-A08",
    location: "LABORATORIO DE TELECOMUNICACIONES",
    status: true,
  },
];
