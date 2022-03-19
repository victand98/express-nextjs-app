import axios from "../helpers/axios";

const NapService = {
  save: (data) => axios.post("/nap", data),
  one: (id) => axios.get(`/nap/${id}`),
  update: (data, id) => axios.put(`/nap/${id}`, data),
};

export { NapService };
