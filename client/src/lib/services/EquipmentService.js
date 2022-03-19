import axios from "../helpers/axios";

const EquipmentService = {
  save: (data) => axios.post("/equipment", data),
  update: (data, id) => axios.put(`/equipment/${id}`, data),
  remove: (id) => axios.delete(`/equipment/${id}`),
};

export { EquipmentService };
