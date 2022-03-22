export const SERVER_URI = process.env.NEXT_PUBLIC_SERVER_URI || "";

export const Resources = {
  users: "usuarios",
  equipment: "equipos",
  backup: "respaldo",
  nap: "nap",
};

export const Actions = {
  read: "read",
  update: "update",
  create: "create",
  delete: "delete",
};

export const PlanOptions = [
  {
    value: "10M",
    label: "10 Mb",
  },
  {
    value: "15M",
    label: "15 Mb",
  },
  {
    value: "20M",
    label: "20 Mb",
  },
];
