import axios from "../helpers/axios";

const BackupService = {
  save: (data) => axios.post("/backup", data),
  one: (id) => axios.get(`/backup/${id}`, { responseType: "blob" }),
  update: (data, id) => axios.put(`/backup/${id}`, data),
  generate: () => axios.post(`/backup/generate`, {}),
};

export { BackupService };
