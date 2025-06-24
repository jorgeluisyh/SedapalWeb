import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import { truncateSync } from 'node:fs';

interface JwtPayload {
  exp: number;
}

export const setAuthToken  = (token: string) => {
  Cookies.set('auth_token', token, { path: '/' });
};

export const removeAuthToken  = () => {
  Cookies.remove('auth_token', { path: '/' });
};

export const isAuthenticated = (): boolean => {
  const token = Cookies.get('auth_token');
  if (!token) return false;

  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    if (Date.now() >= exp * 1000) {
      removeAuthToken();
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

// export const isAuthenticated = ():boolean => {
//   return true
// };
