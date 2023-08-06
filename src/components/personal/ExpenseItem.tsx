import { Box, Typography } from "@mui/material";
import { FC } from "react";

interface Props {
  expense: IExpense;
}

const ExpenseItem: FC<Props> = ({ expense }) => {
  return (
    <Box display="flex">
      <Box>
        <Typography>{expense.dateTime}</Typography>
        <Typography>{expense.category}</Typography>
      </Box>
      <Box>
        <Typography color="danger">{expense.value.toLocaleString()}</Typography>
        {expense.currency && <Typography color="danger">{expense.currency}</Typography>}
      </Box>
    </Box>
  );
};

export default ExpenseItem;
