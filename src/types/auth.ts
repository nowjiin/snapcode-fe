export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: 'bearer';
}

export interface AuthError {
  message: string;
  status: number;
}

export interface ValidationError {
  detail: Array<{
    loc: [string, number];
    msg: string;
    type: string;
  }>;
}
