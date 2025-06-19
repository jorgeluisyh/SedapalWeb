import Cookies from 'js-cookie';

export const setAuthToken  = (token: string) => {
  Cookies.set('auth_token', token, { path: '/' });
};

export const removeAuthToken  = () => {
  Cookies.remove('auth_token', { path: '/' });
};

export const isAuthenticated = () : boolean => {
  const token = Cookies.get('auth_token')
  return token == undefined 
}