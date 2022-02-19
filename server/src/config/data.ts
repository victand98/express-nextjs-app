import { Roles } from "../helpers/types";
import { RoleAttrs } from "../models";

export const initialRoles: RoleAttrs[] = [
  {
    name: Roles.administrator,
    privilege: 4,
    status: true,
  },
  {
    name: Roles.teacher,
    privilege: 10,
    status: true,
  },
  {
    name: Roles.student,
    privilege: 15,
    status: true,
  },
  {
    name: Roles.administrator,
    privilege: 20,
    status: true,
  },
];
