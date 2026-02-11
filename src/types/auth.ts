export interface User {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  data?: {
    accessToken: string;
    user: User;
    needsPasswordChange?: boolean;
  };
  user?: User;
}
