import { fetcher } from "./config";

interface loginUserParams {
  email: string;
  password: string;
}

interface registerUserParams {
  name: string;
  email: string;
  password: string;
}

export const loginUser = (body: loginUserParams) => {
  return fetcher.post("/api/auth/login", body);
};

export const registerUser = (body: registerUserParams) => {
  return fetcher.post("/api/auth/register", body);
};
