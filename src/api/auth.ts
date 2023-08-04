import { ApiResponse, fetcher } from "./config";

interface LoginUserParams {
  email: string;
  password: string;
}

interface RegisterUserParams {
  name: string;
  email: string;
  password: string;
}

interface LoginResData {
  accessToken: string;
  user: IUser;
}

export const loginUser = (body: LoginUserParams) => {
  return fetcher.post<ApiResponse<LoginResData>>("/auth/login", body);
};

export const registerUser = (body: RegisterUserParams) => {
  return fetcher.post("/auth/register", body);
};
