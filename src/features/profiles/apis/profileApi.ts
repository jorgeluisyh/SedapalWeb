import { axiosInstance } from "../../../shared/http/axiosInstance";
import type { Profile } from "../types/profileType";


export const getProfile = async (): Promise<Profile[]> => {
    const response = await axiosInstance.get("/api/Perfiles");
    return response.data;
}

export const postProfile = async (data: Profile) => {
    const response = await axiosInstance.post("/api/Perfiles", data);
    return response.data;
}

export const updateProfile = async (id: number, data: Profile) => {
    const response = await axiosInstance.put(`/api/Perfiles/${id}`, data);
    return response.data;
}

export const deleteProfile = async (id: number) => {
    const response = await axiosInstance.delete(`/api/Perfiles/${id}`);
    return response.data;
}