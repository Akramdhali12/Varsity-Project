import { useEffect, useState } from "react"
import axiosInstance from "../../../Interceptor/AxiosInterceptor";


const useProtectedImage = (imageId)=>{
    const [imageUrl,setImageUrl] = useState('/avatar.png');
    useEffect(()=>{
        if(!imageId) return;
        axiosInstance.get('/media/'+imageId,{responseType:'blob'})
            .then((response)=>{
                const url = URL.createObjectURL(response.data);
                setImageUrl(url);
            }).catch((error)=>{
                console.error("Error fetching protected image:",error);
            });
    },[imageId])

    return imageUrl;
}

export default useProtectedImage;