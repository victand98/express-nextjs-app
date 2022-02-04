import { FiUsers } from "react-icons/fi";
import { HiDesktopComputer } from "react-icons/hi";
import { MdBackup } from "react-icons/md";
import { Resources } from "../lib/helpers/constants";

export const dashboardItems = [
  {
    name: "Usuarios",
    path: "/usuarios",
    icon: FiUsers,
    resource: Resources.users,
  },
  {
    name: "Equipos",
    path: "/equipos",
    icon: HiDesktopComputer,
    resource: Resources.equipment,
  },
  {
    name: "Respaldos",
    path: "/respaldos",
    icon: MdBackup,
    resource: Resources.backup,
  },
];
