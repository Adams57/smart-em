import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/auth";
import { ApiResponse } from "@/types/responses";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    // Initialize Axios with base URL from .env
    const baseURL = import.meta.env.VITE_SERVER_URL as string | undefined;
    if (!baseURL) {
      console.error("VITE_SERVER_URL is not defined in .env file");
      throw new Error("VITE_SERVER_URL is required for API configuration");
    }

    this.api = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json"
      }
    });

    // Add request interceptor to include access token
    this.api.interceptors.request.use((config) => {
      const authStore = useAuthStore();
      const accessToken =
        authStore.accessToken || localStorage.getItem("accessToken");
      if (accessToken && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        let errorMessage = "An unexpected error occurred";
        if (axios.isAxiosError(error) && error.response) {
          const apiResponse = error.response.data as ApiResponse<unknown>;
          if (apiResponse.errors && apiResponse.errors.length > 0) {
            errorMessage = apiResponse.errors.join(", ");
          } else if (error.response.data.message) {
            errorMessage = error.response.data.message;
          }
        }
        return Promise.reject(new Error(errorMessage));
      }
    );
  }

  // Generic GET request
  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.api.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  // Generic POST request
  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.api.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  // Generic PUT request
  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.api.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  // Generic DELETE request
  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.api.delete<ApiResponse<T>>(url, config);
    return response.data;
  }
}

export default new ApiService();
