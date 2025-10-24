import axiosInstance from "../Interceptor/AxiosInterceptor";

const getdoctor = async (id) => {
  return axiosInstance.get("/profile/doctor/get/"+ id)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

const updatedoctor = async(doctor)=>{
    return axiosInstance.put("/profile/doctor/update", doctor)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

const getdoctorDropdown = async () => {
    return axiosInstance.get("/profile/doctor/dropdowns")
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  };

export {getdoctor, updatedoctor, getdoctorDropdown};