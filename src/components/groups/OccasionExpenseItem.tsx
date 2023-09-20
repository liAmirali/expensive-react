import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC } from "react";
import { MaterialSymbol } from "react-material-symbols";
import { useAppSelector } from "../../store";
import { getUserDisplayName } from "../../utils/getters";
import SingleAvatar from "../atoms/users/SingleAvatar";
import AvatarGroup from "../atoms/users/AvatarGroup";

interface Props {
  expense: IExpense;
  paidBy?: IUser;
  assignedTo?: IUser[];
  debtsAndDemands: DebtsAndDemands;
}

const OccasionExpenseItem: FC<Props> = ({ expense, paidBy, assignedTo, debtsAndDemands }) => {
  const loggedInUser = useAppSelector((state) => state.auth.user)!;

  const assigneeCandidates = assignedTo?.slice(0, 3) || [];

  console.log("expense :>> ", expense);
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

      <Box flexGrow={1} display="flex" flexDirection="column" rowGap={0.5}>
        {paidBy && (
          <Box display="flex" columnGap={1} alignItems="center">
            <SingleAvatar person={paidBy} width={20} height={20} />
            <Typography variant="caption">
              {(paidBy._id === loggedInUser._id ? "You" : getUserDisplayName(paidBy)) + " paid"}
            </Typography>
          </Box>
        )}
        <Typography variant="h6">{expense.title}</Typography>
        <Typography variant="caption">
          {dayjs(expense.dateTime).fromNow() + (expense.category ? " | " + expense.category : "")}
        </Typography>
        {assignedTo ? (
          <Box display="flex" columnGap={1} alignItems="center">
            <AvatarGroup people={assignedTo} n={3} width={20} height={20} />
            <Typography variant="caption">
              {assigneeCandidates.map(
                (assignee, index) =>
                  getUserDisplayName(assignee) +
                  (index === assigneeCandidates.length - 2
                    ? " and "
                    : index === assigneeCandidates.length - 1
                    ? ""
                    : ", ")
              )}{" "}
              are assigned.
            </Typography>
          </Box>
        ) : (
          <Typography>Nobody is assigned.</Typography>
        )}
      </Box>

      <Box display="flex" alignItems="center" columnGap={1}>
        <Typography variant="h6" color={expense.type === "EXPENSE" ? "error" : "green"}>
          {(expense.type === "EXPENSE" ? "-" : "+") + expense.value.toString().toLocaleString()}
        </Typography>
        {expense.currency && <Typography align="right">{expense.currency}</Typography>}
      </Box>
    </Box>
  );
};

export default OccasionExpenseItem;
