import { QueryFunction, QueryFunctionContext } from "@tanstack/react-query";
import { ApiResponse, fetcher } from "./config";
import { AxiosResponse } from "axios";

interface GetExpenseParams {
  minValue?: number;
  maxValue?: number;
  description?: string;
  category?: string;
  startDate?: Date;
  endDate?: Date;
}

export const getPersonalExpenses = () => {
  // console.log("queryKey:", queryKey);
  return fetcher.get<ApiResponse<{ expenses: IExpense[] }>>("/expense");
};

export const addPersonalExpense = (data: IExpense) => {
  return fetcher.post<ApiResponse<{ expense: IExpense }>>("/expense", data);
};