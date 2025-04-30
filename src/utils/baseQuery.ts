import { fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { logout, setCredentials } from '@/features/auth/authSlice';
import { RefreshTokenResponse } from '@/features/auth/interfaces';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,

  prepareHeaders: (headers, { getState }) => {
    // Add token if available
    const userData = JSON.parse(
      localStorage.getItem('@propify_admin_user') || '{}',
    );
    const token =
      (getState() as RootState).auth.accessToken || userData?.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

// Wrapper for the baseQuery to handle refresh token logic
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If the request fails with a 401 Unauthorized error
  if (result?.error?.status === 401) {
    console.log('Access token expired, attempting to refresh...');

    // Try to refresh the token using the refresh token
    const userData = JSON.parse(localStorage.getItem('@seeker_user') || '{}');
    const refreshToken = userData?.refreshToken;

    console.log(refreshToken);

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: '/refresh-token',
          method: 'POST',
          body: { refreshToken: refreshToken },
        },
        api,
        extraOptions,
      );

      const refreshData = refreshResult?.data as RefreshTokenResponse;

      if (refreshData?.accessToken) {
        // If refresh is successful, store new tokens
        const newAccessToken = refreshData.accessToken;
        const updatedUserData = {
          ...userData, // Keep all other user info intact
          accessToken: newAccessToken,
        };
        localStorage.setItem('@seeker_user', JSON.stringify(updatedUserData));

        // Update Redux store with new tokens
        api.dispatch(
          setCredentials({
            ...updatedUserData,
          }),
        );

        // Retry the original request with the new access token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // If refresh fails, log the user out
        api.dispatch(logout());
      }
    } else {
      // If no refresh token exists, log the user out
      api.dispatch(logout());
    }
  }

  return result;
};
