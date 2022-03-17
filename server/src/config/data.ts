import { Roles } from "../helpers/types";
import { RoleAttrs } from "../models";

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
