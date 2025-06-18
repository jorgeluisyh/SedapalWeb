import axios from 'axios';

export const authenticateUser = async (data: { username: string; password: string }) => {
    const loginUrl = import.meta.env.VITE_API_BASE_URL + '/api/Auth/login';
    const response = await axios.post(loginUrl, data);
    return response.data;
};



