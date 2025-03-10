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
  adminId: string;
  firstName: string;
  lastName: string;
  email: string;
  is2FA: boolean;
  status: string;
  role: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
}

export interface CreatePasswordPayload {
  password: string;
  confirmPassword: string;
}

export interface LoginResponse extends IResponse {
  message: string;
  data: User;
}
export interface LoginPayload {
  email: string;
  password: string;
}

export interface ResetPasswordPayload {
  password: string;
  confirmPassword: string;
  resetToken: string;
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
