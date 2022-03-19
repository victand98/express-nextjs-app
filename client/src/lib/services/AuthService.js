import axios from "../helpers/axios";

const AuthService = {
  login: (data) => axios.post("/auth/signin", data),
  logout: () => axios.post("/auth/logout"),
};

export { AuthService };
