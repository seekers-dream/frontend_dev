/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

// get the base url and the timeout
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 50000,
  withCredentials: true,
});

// for the request
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('token');
    console.log('storage', localStorage.getItem('token'));
    const language = localStorage.getItem('language') || 'en';
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    config.headers['Accept-language'] = language;
    return config;
  },
  (error) => Promise.reject(error),
);

// for the response
export const setupInterceptorsInstance = (navigate: any) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      // check for error
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        // get the refreshToken
        const refreshToken = localStorage.getItem('refreshToken');
        try {
          // fetch the data
          const { data } = await axiosInstance.post('/refresh-token', {
            token: refreshToken,
          });
          // set the new accesstoken
          localStorage.setItem('token', data.accessToken);
          axiosInstance.defaults.headers.common['Authorization'] =
            `Bearer ${data.accessToken}`;
          return axiosInstance(originalRequest);
        } catch (error) {
          console.log(error);
          // redirect back to the login page
          navigate('/login');
        }
      }
      return Promise.reject(error);
    },
  );
};

export default axiosInstance;
