import axios from "axios";
import { SERVER_URI } from "./constants";

const instance = axios.create({
  baseURL: SERVER_URI,
  withCredentials: true,
});

const responseHandler = (response) => {
  return response;
};

const errorHandler = async (error) => {
  if (error.response) {
    const { data } = error.response;
    return Promise.reject(data);
  } else if (error.request) {
    return Promise.reject({
      errors: [
        {
          message:
            "No se ha podido establecer comunicación con el servidor, por favor, vuelva a intentarlo.",
        },
      ],
    });
  }

  return Promise.reject({
    errors: [{ message: "Ha ocurrido un error inesperado" }],
  });
};

instance.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default instance;
