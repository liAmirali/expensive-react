import { QueryFunctionContext } from "@tanstack/react-query";
import { ApiResponse, fetcher } from "./config";

export const searchUsers = ({
  queryKey,
}: QueryFunctionContext<[string, string, { q: string }]>) => {
  return fetcher.get<ApiResponse<{ users: ITrimmedUser[] }>>("/user/search", {
    params: { q: queryKey[2].q },
  });
};
