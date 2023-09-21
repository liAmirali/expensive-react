import { ApiResponse, fetcher } from "./config";

// interface GetExpenseParams {
//   minValue?: number;
//   maxValue?: number;
//   description?: string;
//   category?: string;
//   startDate?: Date;
//   endDate?: Date;
// }

export const getPersonalExpenses = () => {
  return fetcher.get<ApiResponse<{ expenses: IExpense[] }>>("/expense");
};

export const addPersonalExpense = (data: IExpense) => {
  return fetcher.post<ApiResponse<{ expense: IExpense }>>("/expense", data);
};
