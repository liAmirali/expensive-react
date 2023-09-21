import { MutationFunction, QueryFunction } from "@tanstack/react-query";
import { ApiResponse, fetcher } from "./config";
import { AxiosResponse } from "axios";

export interface CreateGroupData {
  name: string;
  members: string[];
}

export const getGroupDetails: QueryFunction<
  AxiosResponse<ApiResponse<{ group: IGroup }>>,
  ["groupDetails", "groupId", { groupId: string }]
> = ({ queryKey }) => {
  return fetcher.get<ApiResponse<{ group: IGroup }>>(`/group/${queryKey[2].groupId}`);
};

export const getGroupsList = () => {
  return fetcher.get<ApiResponse<{ groups: IGroup[] }>>("/group");
};

export const createGroup = (data: CreateGroupData) => {
  return fetcher.post<ApiResponse<{ group: IGroup }>>("/group", data);
};

export const getOccasionDetails: QueryFunction<
  AxiosResponse<ApiResponse<{ occasion: IOccasion; debtsAndDemands: DebtsAndDemands }>>,
  ["occasionDetails", "groupId", "occasionId", { groupId: string; occasionId: string }]
> = ({ queryKey }) => {
  const groupId = queryKey[3].groupId;
  const occasionId = queryKey[3].occasionId;

  return fetcher.get(`/group/occasion/${occasionId}`, { params: { groupId } });
};

export const createOccasion: MutationFunction<
  AxiosResponse<ApiResponse<IOccasion>>,
  { groupId: string; name: string; members: string[] }
> = (data) => {
  return fetcher.post("/group/occasion", data);
};
