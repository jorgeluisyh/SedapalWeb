import { axiosInstance } from "../../../shared/http/axiosInstance";
import type { WmsService } from "../types/wmsServiceType";


export const getWmsServices = async (): Promise<WmsService[]> => {
    const response = await axiosInstance.get("/api/Servicios/servicioswms");
    return response.data;
}

export const postWmsService = async (data: WmsService) => {
    const response = await axiosInstance.post("/api/Servicios/servicioswms", data);
    return response.data;
}

export const updateWmsService = async (id: number, data: WmsService) => {
    const response = await axiosInstance.put(`/api/Servicios/servicioswms/${id}`, data);
    return response.data;
}

export const deleteWmsService = async (id: number) => {
    const response = await axiosInstance.delete(`/api/Servicios/servicioswms/${id}`);
    return response.data;
}

