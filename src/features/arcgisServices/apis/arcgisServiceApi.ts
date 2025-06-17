import { axiosInstance } from "../../../shared/http/axiosInstance";


export const getArcgisServices = async () => {
    const response = await axiosInstance.get("/api/Servicios/serviciosmapa");
    return response.data;
}

export const getProducts = async () => {
    const response = await axiosInstance.get("/products");
    return response.data;
}
