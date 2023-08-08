import { QueryFunctionContext } from "@tanstack/react-query";
import { ApiResponse, fetcher } from "./config";

export interface SearchedUser {
  _id: string;
  email: string;
  username: string;
  name: string;
}

export const searchUsers = ({
  queryKey,
}: QueryFunctionContext<[string, string, { q: string }]>) => {
  return fetcher.get<ApiResponse<{ users: SearchedUser[] }>>("/user/search", {
    params: { q: queryKey[2].q },
  });
};
