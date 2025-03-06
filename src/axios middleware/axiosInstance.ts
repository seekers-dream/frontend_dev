import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token); // Debugging
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export const setupInterceptorsInstance = (navigate: any) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('refreshToken');
        console.log('Refresh token from localStorage:', refreshToken); // Debugging
        try {
          const { data } = await axiosInstance.post('/refresh-token', {
            token: refreshToken,
          });
          console.log('New access token:', data.token); // Debugging
          localStorage.setItem('token', JSON.stringify(data.token));
          axiosInstance.defaults.headers.common['Authorization'] =
            `Bearer ${data.token}`;
          return axiosInstance(originalRequest);
        } catch (error) {
          console.log('Token refresh failed:', error); // Debugging
          navigate('/login');
        }
      }
      return Promise.reject(error);
    },
  );
};

export default axiosInstance;
