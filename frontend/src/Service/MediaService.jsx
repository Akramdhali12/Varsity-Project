import axiosInstance from "../Interceptor/AxiosInterceptor";

const uploadMedia = async (file) => {
    const formData = new FormData();
    formData.append('file',file);
  return axiosInstance.post("/media/upload", formData,{
    headers:{
        'Content-Type':'multipart/form-data'
    }
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
const getMedia = async (id) => {
  return axiosInstance.get("/media"+ id)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export {uploadMedia,getMedia};