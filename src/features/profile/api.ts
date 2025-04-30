import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/utils/baseQuery';
import { IResponse } from '../auth/interfaces';
import {
  ChangePasswordPayload,
  UpdatePayload,
  UpdateProfilePicturePayload,
} from './interfaces';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getProfile: builder.mutation<IResponse, void>({
      query: () => ({
        url: `/profile`,
        method: 'GET',
      }),
    }),

    updateProfile: builder.mutation<IResponse, UpdatePayload>({
      query: (payload) => ({
        url: `/update-profile`,
        method: 'PATCH',
        body: payload,
      }),
    }),

    updateProfilePicture: builder.mutation<
      IResponse,
      UpdateProfilePicturePayload
    >({
      query: (payload) => ({
        url: `/upload_avatar/${payload.id}/media`,
        method: 'POST',
        body: payload,
      }),
    }),

    changePassword: builder.mutation<IResponse, ChangePasswordPayload>({
      query: (payload) => ({
        url: `/profile/change-password`,
        method: 'PATCH',
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetProfileMutation,
  useUpdateProfileMutation,
  useUpdateProfilePictureMutation,
  useChangePasswordMutation,
} = profileApi;
