interface IUser {
  _id: string;
  name?: string;
  username: string;
  email?: string;
  groups?: IGroup[];
  expenses: IExpense[];
  profilePicture?: string | null;
}

interface ITrimmedUser {
  _id: string;
  email: string;
  username: string;
  name: string;
}

type ExpenseType = "EXPENSE" | "INCOME";

interface IExpense {
  _id: string;
  type: ExpenseType;
  value: number;
  currency: string;
  title: string;
  description?: string;
  category?: string;
  dateTime: string;
}

