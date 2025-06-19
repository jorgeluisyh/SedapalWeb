import Cookies from 'js-cookie';

export const setAuthToken  = (token: string) => {
  Cookies.set('auth_token', token, { path: '/' });
};

export const removeAuthToken  = () => {
  Cookies.remove('auth_token', { path: '/' });
};

export const isAuthenticated = () : boolean => {
    console.log("viendo cookies")
  const token = Cookies.get('auth_token')
  console.log(token)
  return token == undefined 
}