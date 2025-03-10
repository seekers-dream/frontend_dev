import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/utils/baseQuery';
import {
  CreatePasswordPayload,
  IResponse,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  ResendCodePayload,
  ResetPasswordPayload,
  VerifyPayload,
} from './interfaces';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    register: builder.mutation<IResponse, RegisterPayload>({
      query: (credentials) => ({
        url: `/register`,
        method: 'POST',
        body: credentials,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (credentials) => ({
        url: `/login`,
        method: 'POST',
        body: credentials,
      }),
    }),
    createPassword: builder.mutation<LoginResponse, CreatePasswordPayload>({
      query: (credentials) => ({
        url: `/admin/auth/createPassword`,
        method: 'POST',
        body: credentials,
      }),
    }),
    verifyEmail: builder.mutation<IResponse, VerifyPayload>({
      query: (payload) => ({
        url: `/verify-email`,
        method: 'POST',
        body: payload,
      }),
    }),
    resetPassword: builder.mutation<IResponse, ResetPasswordPayload>({
      query: (payload) => ({
        url: `/admin/auth/resetPassword/${payload.resetToken}`,
        method: 'POST',
        body: payload,
      }),
    }),
    forgotPassword: builder.mutation<IResponse, void>({
      query: (payload) => ({
        url: `/admin/auth/forgotPassword`,
        method: 'POST',
        body: payload,
      }),
    }),
    resendCode: builder.mutation<IResponse, ResendCodePayload>({
      query: (payload) => ({
        url: `/resend-otp`,
        method: 'POST',
        body: payload,
      }),
    }),
    logout: builder.mutation<IResponse, void>({
      query: () => ({
        url: `/admin/auth/signout`,
        method: 'POST',
      }),
    }),
    verifyToken: builder.query<IResponse, void>({
      query: () => ({
        url: `/admin/auth/verifyToken`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useCreatePasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
  useResendCodeMutation,
  useLogoutMutation,
  useVerifyTokenQuery,
} = authApi;
