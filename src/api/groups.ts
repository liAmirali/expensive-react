import { ApiResponse, fetcher } from "./config";

export interface CreateGroupData {
  name: string;
  members: string[];
}

export const getGroupsList = () => {
  return fetcher.get<ApiResponse<{ groups: IGroup[] }>>("/group");
};

export const createGroup = (data: CreateGroupData) => {
  return fetcher.post<ApiResponse<{ group: IGroup }>>("/group", data);
};
