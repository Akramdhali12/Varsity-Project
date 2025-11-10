import axiosInstance from "../Interceptor/AxiosInterceptor";

const AddMedicine = async (data) => {
  return axiosInstance.post("/pharmacy/medicines/add", data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
const getMedicine = async (id) => {
  return axiosInstance.get("/pharmacy/medicines/get/"+ id)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
const getAllMedicines = async () => {
  return axiosInstance.get("/pharmacy/medicines/getAll")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
const updateMedicine = async (data) => {
  return axiosInstance.put("/pharmacy/medicines/update",data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export {AddMedicine,getMedicine,getAllMedicines,updateMedicine};
