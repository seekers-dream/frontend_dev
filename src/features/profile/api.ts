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
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    getProfile: builder.query<IResponse, void>({
      query: () => ({
        url: `/profile`,
        method: 'GET',
      }),
      providesTags: ['Profile'],
    }),

    updateProfile: builder.mutation<IResponse, UpdatePayload>({
      query: (payload) => ({
        url: `/update-profile`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['Profile'],
    }),

    updateProfilePicture: builder.mutation<
      IResponse,
      UpdateProfilePicturePayload
    >({
      query: (payload) => ({
        url: `/upload_avatar/${payload.id}/media`,
        method: 'POST',
        body: payload.avatar,
      }),
      invalidatesTags: ['Profile'],
    }),

    changePassword: builder.mutation<IResponse, ChangePasswordPayload>({
      query: (payload) => ({
        url: `/profile/change-password`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdateProfilePictureMutation,
  useChangePasswordMutation,
} = profileApi;
