import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC } from "react";
import { MaterialSymbol } from "react-material-symbols";

interface Props {
  expense: IExpense;
  userId?: string;
  paidBy?: IUser;
  assignedTo?: IUser[];
}

const OccasionExpenseItem: FC<Props> = ({ expense, userId }) => {
  console.log('expense :>> ', expense);
  return (
    <Box
      display="flex"
      sx={{ backgroundColor: "white", borderRadius: 3, border: "1px #f0f0f0 solid", p: 2, mb: 2 }}
    >
      <Box display="flex" alignItems="center" mr={2}>
        {expense.type === "EXPENSE" ? (
          <MaterialSymbol icon="payments" size={35} weight={100} />
        ) : (
          <MaterialSymbol icon="savings" size={35} weight={100} />
        )}
      </Box>

      <Box flexGrow={1}>
        <Typography variant="h6">{expense.title}</Typography>
        <Typography>{}</Typography>
        <Typography variant="caption">
          {(expense.category ? expense.category + " | " : "") + dayjs(expense.dateTime).fromNow()}
        </Typography>
      </Box>

      <Box>
        <Typography variant="h6" color={expense.type === "EXPENSE" ? "error" : "green"}>
          {(expense.type === "EXPENSE" ? "-" : "+") + expense.value.toString().toLocaleString()}
        </Typography>
        {expense.currency && <Typography align="right">{expense.currency}</Typography>}
      </Box>
    </Box>
  );
};

export default OccasionExpenseItem;
