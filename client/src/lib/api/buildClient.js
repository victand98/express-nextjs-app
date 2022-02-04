import axios from "axios";
import { SERVER_URI } from "../helpers/constants";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // We are on the server
    return axios.create({
      baseURL: SERVER_URI,
      headers: req.headers,
    });
  } else {
    // We are on the client
    return axios.create({
      baseURL: SERVER_URI,
      withCredentials: true,
    });
  }
};

export default buildClient;
