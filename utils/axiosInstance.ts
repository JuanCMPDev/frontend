import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL || "http://localhost:3000/api",
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token") || null;

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (err: AxiosError) => {
    if (err.response?.status === 401) {
      /* if (typeof window !== 401)
        // */
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
