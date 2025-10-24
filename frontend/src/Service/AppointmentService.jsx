
import axiosInstance from "../Interceptor/AxiosInterceptor";

const scheduleAppointment = async (data) => {
  return axiosInstance.post("/appointment/schedule", data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

const cancelAppointment = async (id) => {
  return axiosInstance.put("/appointment/cancel/"+ id)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
const getAppointment = async (id) => {
  return axiosInstance.get("/appointment/get/"+ id)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
const getAppointmentDetails = async (id) => {
  return axiosInstance.get("/appointment/get/details/"+ id)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export { scheduleAppointment, cancelAppointment, getAppointment, getAppointmentDetails };

