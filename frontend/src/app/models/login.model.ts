export interface LoginModel {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    // Ajoutez d'autres propriétés utilisateur si nécessaire
  };
}
