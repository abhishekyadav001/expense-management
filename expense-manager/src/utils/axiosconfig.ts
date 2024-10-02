import axios from "axios";
import { getLocalStorageItem } from "./localStorage";

// Get the base URL from environment variables
const apiUrl = import.meta.env.VITE_REACT_APP_API;

// Create an axios instance
export const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor to add access token to headers if available
axiosInstance.interceptors.request.use(
  (config: any) => {
    const accessToken = getLocalStorageItem("accessToken");
    if (accessToken) {
      // Add the access token to the request headers
      if (config.headers) {
        config.headers["x-access-token"] = accessToken;
      }
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
