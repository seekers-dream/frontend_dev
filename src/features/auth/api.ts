import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/utils/baseQuery';
import {
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

    verifyEmail: builder.mutation<IResponse, VerifyPayload>({
      query: (payload) => ({
        url: `/verify-email`,
        method: 'POST',
        body: payload,
      }),
    }),
    resetPassword: builder.mutation<IResponse, ResetPasswordPayload>({
      query: ({ password, confirmPassword, token }) => ({
        url: `/reset?token=${token}`,
        method: 'POST',
        body: { password, confirmPassword },
      }),
    }),
    forgotPassword: builder.mutation<IResponse, ResendCodePayload>({
      query: (payload) => ({
        url: `/forgot`,
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
        url: `/logout`,
        method: 'POST',
      }),
    }),
    getCurrentUser: builder.query<IResponse, void>({
      query: () => ({
        url: `/currentuser`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
  useResendCodeMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
} = authApi;
