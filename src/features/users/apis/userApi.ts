import { axiosInstance } from "../../../shared/http/axiosInstance";
import type { UserPortal } from "../types/userPortalType";
import type { User } from "../types/userType";


export const getUsers = async (): Promise<User[]> => {
    const response = await axiosInstance.get("/api/Usuarios");
    return response.data;
}

export const postUsers = async (data: User) => {
    const response = await axiosInstance.post("/api/Usuarios", data);
    return response.data;
}

export const updateUsers = async (id: number, data: User) => {
    const response = await axiosInstance.put(`/api/Usuarios/${id}`, data);
    return response.data;
}

export const deleteUsers = async (id: number) => {
    const response = await axiosInstance.delete(`/api/Usuarios/${id}`);
    return response.data;
}

export const validateUser = async (username: string): Promise<UserPortal> => {
    const response = await axiosInstance.post(`/api/Usuarios/ValidarUsuarioPortal?NombreUsuario=${username}`);
    return response.data;
}
