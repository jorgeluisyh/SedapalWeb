import { axiosInstance } from "../../../shared/http/axiosInstance";
import type { User } from "../types/userType";


export const getUsers = async (): Promise<User[]> => {
    const response = await axiosInstance.get("/api/Servicios/users");
    return response.data;
}

export const postUsers = async (data: User) => {
    const response = await axiosInstance.post("/api/Servicios/users", data);
    return response.data;
}

export const updateUsers = async (id: number, data: User) => {
    const response = await axiosInstance.put(`/api/Servicios/users/${id}`, data);
    return response.data;
}

export const deleteUsers = async (id: number) => {
    const response = await axiosInstance.delete(`/api/Servicios/users/${id}`);
    return response.data;
}