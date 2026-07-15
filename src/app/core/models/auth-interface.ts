export interface AuthenticationRequest {
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  token: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserReadOnly {
  uuid: string;
  email: string;
}

export interface LoggedInUser {
  sub: string;
  role: string;
  exp: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserReadOnly {
  uuid: string;
  email: string;
}