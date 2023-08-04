interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  groups: IGroup;
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

interface IExpense {
  value: number;
  description?: string;
  category?: string;
  currency?: string;
  dateTime: string;
}

interface IOccasionExpense extends IExpense {
  paidBy: IUser | string;
  assignedTo: IUser[] | string[];
}
