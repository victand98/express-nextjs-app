import axios from "../helpers/axios";

const UserService = {
  save: (data) => axios.post("/user", data),
  update: (data, id) => axios.put(`/user/${id}`, data),
  remove: (id) => axios.delete(`/user/${id}`),
};

export { UserService };
