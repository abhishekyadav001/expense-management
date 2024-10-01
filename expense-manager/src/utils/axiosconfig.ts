import axios, { AxiosRequestConfig } from "axios";
import.meta.env
import { getLocalStorageItem } from "./localStorage";

const apiUrl =import.meta.env.VITE_API_URL;

// Create an axios instance
export const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor to add access token to headers if available
axiosInstance.interceptors.request.use(
  (config: RawAxiosRequestConfig) => {
    const accessToken = getLocalStorageItem("accessToken");
    if (accessToken) {
      config.headers["x-access-token"] = accessToken;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
