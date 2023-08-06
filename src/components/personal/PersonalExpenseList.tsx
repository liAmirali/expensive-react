import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppSelector } from "../../store";
import ExpenseItem from "./ExpenseItem";
import BankNoteIcon from "../icons/BankNoteIcon";
import { Link } from "react-router-dom";

const PersonalExpenseList = () => {
  // const expense = useQuery({ queryKey: ["personalExpenses"], queryFn: getPersonalExpenses });
  const expenses = useAppSelector((state) => state.auth.user?.expenses);

  useEffect(() => {
    console.log("expense :>> ", expenses);
  }, [expenses]);

  return (
    <Box height="100%">
      {expenses && expenses.length > 0 ? (
        expenses.map((expense) => <ExpenseItem expense={expense} />)
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
