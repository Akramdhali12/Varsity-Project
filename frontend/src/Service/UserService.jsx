
import axiosInstance from "../Interceptor/AxiosInterceptor";

const registerUser = async (userData) => {
  return axiosInstance.post("/user/register", userData)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

const loginUser = async (credentials) => {
  return axiosInstance.post("/user/login", credentials)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export { registerUser , loginUser };
