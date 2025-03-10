/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IResponse {
  success: string;
  message: null | any;
  error?: boolean;
  data?: null | any;
}

export interface User extends IResponse {
  refreshToken: string;
  token: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
}

export interface LoginResponse extends IResponse {
  data: User;
}
export interface LoginPayload {
  email: string;
  password: string;
}

export interface ResetPasswordPayload {
  password: string;
  confirmPassword: string;
  token?: string;
}

export interface VerifyPayload {
  otp: string;
  email: string;
}
export interface ResendCodePayload {
  email: string;
}

export interface RefreshTokenResponse {
  data: {
    accessToken: string;
  };
}
