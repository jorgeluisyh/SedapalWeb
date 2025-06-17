import { axiosInstance } from "../../../shared/http/axiosInstance";
import type { ArcGisService } from "../types/arcgisServiceType";


export const getArcgisServices = async (): Promise<ArcGisService[]> => {
    const response = await axiosInstance.get("/api/Servicios/serviciosmapa");
    return response.data;
}

export const getProducts = async () => {
    const response = await axiosInstance.get("/products");
    return response.data;
}
