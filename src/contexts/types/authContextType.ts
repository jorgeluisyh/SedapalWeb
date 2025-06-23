export interface AuthContextType {
  authenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}