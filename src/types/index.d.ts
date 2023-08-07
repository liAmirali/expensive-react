interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  groups: IGroup[];
  expenses: IExpense[];
  // profilePicture: File | null;
}

interface IGroup {
  name: string;
  members: IUser | string[];
  occasions: IOccasion;
}

interface IOccasion {
  name: string;
  members: IUser | string[];
  expenses: IOccasionExpense;
}

type ExpenseType = "EXPENSE" | "INCOME";

interface IExpense {
  type: ExpenseType;
  value: number;
  currency: string;
  title: string;
  description?: string;
  category?: string;
  dateTime: string;
}

interface IOccasionExpense extends IExpense {
  paidBy: IUser | string;
  assignedTo: IUser[] | string[];
}
