import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9000", // Replace with your API base URL
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Request Interceptor:", config);
    return config;
  }
);

export default axiosInstance;
