import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/utils/baseQuery';
import { IResponse } from '../auth/interfaces';
import { CreatePropertyPayload, UploadImagePayload } from './interfaces';

export const propertiesApi = createApi({
  reducerPath: 'propertiesApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllProperties: builder.query<IResponse, void>({
      query: () => ({
        url: `/house-listing`,
        method: 'GET',
      }),
    }),

    getSingleProperty: builder.query<IResponse, string>({
      query: (id) => ({
        url: `/listing/${id}`,
        method: 'GET',
      }),
    }),

    updateProperty: builder.mutation<IResponse, CreatePropertyPayload>({
      query: (payload) => ({
        url: `/update-listing/${payload.id}`,
        method: 'PATCH',
        body: payload,
      }),
    }),

    uploadPropertyImage: builder.mutation<IResponse, UploadImagePayload>({
      query: (payload) => ({
        url: `/listings/${payload.id}/media`,
        method: 'POST',
        body: payload,
      }),
    }),

    createProperty: builder.mutation<IResponse, CreatePropertyPayload>({
      query: (payload) => ({
        url: `/create-listing`,
        method: 'POST',
        body: payload,
      }),
    }),

    deleteProperty: builder.mutation<IResponse, string>({
      query: (id) => ({
        url: `/delete-listing/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllPropertiesQuery,
  useUpdatePropertyMutation,
  useUploadPropertyImageMutation,
  useCreatePropertyMutation,
  useDeletePropertyMutation,
  useGetSinglePropertyQuery,
} = propertiesApi;
