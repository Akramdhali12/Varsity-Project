import axiosInstance from "../Interceptor/AxiosInterceptor";

const getPatient = async (id) => {
  return axiosInstance.get("/profile/patient/get/"+ id)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

const updatePatient = async(patient)=>{
    return axiosInstance.put("/profile/patient/update", patient)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export {getPatient, updatePatient};