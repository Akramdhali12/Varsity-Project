import axiosInstance from "../Interceptor/AxiosInterceptor";

const addStock = async (data) => {
  return axiosInstance.post("/pharmacy/inventory/add", data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
const getStock = async (id) => {
  return axiosInstance.get("/pharmacy/inventory/get/"+ id)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
const getAllStocks = async () => {
  return axiosInstance.get("/pharmacy/inventory/getAll")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
const updateStock = async (data) => {
  return axiosInstance.put("/pharmacy/inventory/update",data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export {addStock,getStock,getAllStocks,updateStock};
