import axiosInstance from "../Interceptor/AxiosInterceptor";

const AddSale = async (data) => {
  return axiosInstance.post("/pharmacy/sales/create", data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
const getSale = async (id) => {
  return axiosInstance.get("/pharmacy/sales/get/"+ id)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
const getAllSaleItems = async (id) => {
  return axiosInstance.get("/pharmacy/sales/getSaleItems/"+id)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
const updateSale = async (data) => {
  return axiosInstance.put("/pharmacy/sales/update",data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
const getAllSales = async () => {
  return axiosInstance.get("/pharmacy/sales/getAll")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export {AddSale,getSale,getAllSaleItems,updateSale,getAllSales};
