import { Box, Button, Typography } from "@mui/material";
import ExpenseItem from "./ExpenseItem";
import BankNoteIcon from "../icons/BankNoteIcon";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPersonalExpenses } from "../../api/expenses";
import BackdropLoading from "../atoms/loading/BackdropLoading";

const PersonalExpenseList = () => {
  const expenses = useQuery({ queryKey: ["personalExpenses"], queryFn: getPersonalExpenses });
  const res = expenses.data?.data;

  return (
    <Box height="100%">
      <BackdropLoading open={expenses.isLoading} />
      {expenses.isError ? (
        <p>Error</p>
      ) : res && res.data.expenses.length > 0 ? (
        res.data.expenses.map((expense) => <ExpenseItem expense={expense} />)
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <BankNoteIcon className="w-12 h-12" />
          <Typography mt={3} variant="h5">
            Damn, no expense since eternity?
          </Typography>
          <Link to="add">
            <Button size="large">Try adding new ones</Button>
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default PersonalExpenseList;
