import { Resources, Roles } from "./types";

export const defaultResources = [
  {
    name: Resources.users,
    roles: [
      {
        role: Roles.administrator,
        read: true,
        create: true,
        update: true,
        delete: true,
      },
      {
        role: Roles.teacher,
        read: true,
        create: true,
        update: true,
        delete: true,
      },
      {
        role: Roles.student,
        read: true,
        create: false,
        update: false,
        delete: false,
      },
      {
        role: Roles.guest,
        read: true,
        create: false,
        update: false,
        delete: false,
      },
    ],
  },
  {
    name: Resources.backup,
    roles: [
      {
        role: Roles.administrator,
        read: true,
        create: true,
        update: true,
        delete: true,
      },
      {
        role: Roles.teacher,
        read: true,
        create: true,
        update: true,
        delete: true,
      },
      {
        role: Roles.student,
        read: true,
        create: false,
        update: false,
        delete: false,
      },
    ],
  },
  {
    name: Resources.equipment,
    roles: [
      {
        role: Roles.administrator,
        read: true,
        create: true,
        update: true,
        delete: true,
      },
      {
        role: Roles.teacher,
        read: true,
        create: true,
        update: true,
        delete: false,
      },
      {
        role: Roles.student,
        read: true,
        create: false,
        update: false,
        delete: false,
      },
      {
        role: Roles.guest,
        read: true,
        create: false,
        update: false,
        delete: false,
      },
    ],
  },
];
