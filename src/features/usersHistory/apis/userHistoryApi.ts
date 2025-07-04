import { axiosInstance } from "../../../shared/http/axiosInstance";
import type { RecordsUserHistoryType } from "../types/recordsUserHistoryType";
import type { UserHistoryType } from "../types/userHistoryType";


export const getUserHistory = async (): Promise<UserHistoryType[]> => {
    const response = await axiosInstance.get("/api/Usuarios");
    return response.data;
}

export const getRecordsUserHistory = async (): Promise<RecordsUserHistoryType[]> => {
    const response = await axiosInstance.get("/api/Usuarios/HistoricoUsuarios");
    return response.data;
}

export const postUserHistory = async (data: UserHistoryType) => {
    const response = await axiosInstance.post("/api/Servicios/users", data);
    return response.data;
}

export const updateUserHistory = async (id: number, data: UserHistoryType) => {
    const response = await axiosInstance.put(`/api/Servicios/users/${id}`, data);
    return response.data;
}

export const deleteUserHistory = async (id: number) => {
    const response = await axiosInstance.delete(`/api/Servicios/users/${id}`);
    return response.data;
}