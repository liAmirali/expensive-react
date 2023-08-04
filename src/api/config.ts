import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const fetcher = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export enum CacheKey {
  USER = "AUTH/USER",
}

export interface ApiResponse<T = null> {
  message: string;
  data: T;
  statusCode: number;
}
