import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const storedAccessToken = window.localStorage.getItem("accessToken");
console.log("******ACCESSED LOCAL STORAGE******", "accessToken:", storedAccessToken);

export const fetcher = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: storedAccessToken ? "Bearer " + storedAccessToken : undefined,
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
