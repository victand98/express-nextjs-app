import axios from "../helpers/axios";

const BackupService = {
  save: (data) => axios.post("/backup", data),
  update: (data, id) => axios.put(`/backup/${id}`, data),
};

export { BackupService };
