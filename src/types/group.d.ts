interface IGroup {
  _id: string;
  name: string;
  members: IUser[] | string[];
  occasions: IOccasion[];
}

interface IOccasion {
  _id: string;
  name: string;
  members: IUser[] | string[];
  expenses: IOccasionExpense[];
}

interface IOccasionExpense extends IExpense {
  paidBy: string;
  assignedTo: string[];
  dong?: number;
  demand?: number;
}

type DebtsAndDemands = { [key: string]: { demand: number; debt: number } };
