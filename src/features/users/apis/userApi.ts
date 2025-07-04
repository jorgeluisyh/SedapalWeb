import type { AxiosResponse } from "axios";
import { axiosInstance } from "../../../shared/http/axiosInstance";
import type { UserExterno } from "../types/newUserExternalType";
import type { UserPortal } from "../types/userPortalType";
import type { User } from "../types/userType";
import type { EditUser } from "../types/editUserType";
import type { EditMultipleUsers } from "../types/editMultipleUsersType";


export const getUsers = async (): Promise<User[]> => {
    const response = await axiosInstance.get("/api/Usuarios");
    return response.data;
}

export const postLDAPUser = async (data: User) => {
    const response = await axiosInstance.post("/api/Usuarios/CrearUsuarioLDAP", data);
    return response.data;
}

export const postExternalUser = async (data: UserExterno) => {
    const response = await axiosInstance.post("/api/Usuarios/UsuarioExterno", data);
    return response.data;
}
export const updateUser = async (data: EditUser) => {
    const response = await axiosInstance.put(`/api/Usuarios`, data);
    return response.data;
}

export const updatePerfilesMultipleUser = async (data: EditMultipleUsers) => {
    const response = await axiosInstance.post(`/api/Usuarios/AsignarPerfilesMasivos`, data);
    return response.data;
}


export const deleteUser = async (id: number) => {
    const response = await axiosInstance.delete(`/api/Usuarios/${id}`);
    return response.data;
}

export const validateExternalUserPortal = async (username: string): Promise<UserPortal> => {
    const response = await axiosInstance.post(`/api/Usuarios/ValidarUsuarioExternoPortal?NombreUsuario=${username}`);
    return response.data;
}

export const validateUsuarioLdap = async (username: string): Promise<UserPortal> => {
    const response = await axiosInstance.post(`/api/Usuarios/ValidarUsuarioLDAP?NombreUsuario=${username}`);
    return response.data;
}

export const validateUsuarioBd = async (username: string, tipo: number): Promise<AxiosResponse> => {
    const response = await axiosInstance.post(`/api/Usuarios/ValidarUsuarioBD?NombreUsuario=${username}&Tipo=${tipo}`);
    return response;
}
