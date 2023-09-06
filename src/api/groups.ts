import { QueryFunctionContext } from "@tanstack/react-query";
import { ApiResponse, fetcher } from "./config";

export interface CreateGroupData {
  name: string;
  members: string[];
}

export const getGroupsList = ({ queryKey }: QueryFunctionContext) => {
  return fetcher.get<ApiResponse<{ groups: IGroup[] }>>("/group");
};

export const createGroup = (data: CreateGroupData) => {
  return fetcher.post<ApiResponse<{ group: IGroup }>>("/group", data);
};

// export const