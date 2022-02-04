import axios from "../helpers/axios";

const AuthService = {
  login: ({ email, password }) =>
    axios.post("/auth/signin", { email, password }),
  logout: () => axios.post("/auth/logout"),
};

export { AuthService };
