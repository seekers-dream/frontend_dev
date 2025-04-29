import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/utils/baseQuery';
import { IResponse } from '../auth/interfaces';
import { SendContactPayload } from './interfaces';

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    sendContactMessage: builder.mutation<IResponse, SendContactPayload>({
      query: (payload) => ({
        url: `/contact-us`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useSendContactMessageMutation } = contactApi;
