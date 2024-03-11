import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useMemo } from "react";
import { MaterialSymbol } from "react-material-symbols";
import { useAppSelector } from "../../store";
import { getCorrectNoun, getPrettyPrice, getUserDisplayName } from "../../utils/getters";
import SingleAvatar from "../atoms/users/SingleAvatar";
import AvatarGroup from "../atoms/users/AvatarGroup";

interface Props {
  expense: IOccasionExpense;
  paidBy?: IUser;
  assignedTo?: IUser[];
  debtsAndDemands: DebtsAndDemands;
}

const OccasionExpenseItem: FC<Props> = ({ expense, paidBy, assignedTo }) => {
  const loggedInUser = useAppSelector((state) => state.auth.user)!;

  const assigneeCandidates = useMemo(() => assignedTo?.slice(0, 3) || [], [assignedTo]);

  const payerIsAssignee = assignedTo && paidBy && !!assignedTo.find((i) => i._id === paidBy._id);

  console.log("expense :>> ", expense);
  return (
    <Box
      maxWidth="100%"
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

      <Box flex={1} display="flex" flexDirection="column" rowGap={0.5} overflow="hidden">
        {paidBy && (
          <Box display="flex" columnGap={1} alignItems="center">
            <SingleAvatar person={paidBy} width={20} height={20} />
            <Typography variant="caption">
              {(paidBy._id === loggedInUser._id ? "You" : getUserDisplayName(paidBy)) + " paid"}
            </Typography>
          </Box>
        )}
        <Typography variant="h6">{expense.title}</Typography>
        <Typography variant="body2" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
          {expense.description}
        </Typography>
        <Typography variant="caption">
          {dayjs(expense.dateTime).fromNow() + (expense.category ? " | " + expense.category : "")}
        </Typography>
        {assignedTo ? (
          <Box display="flex" columnGap={1} alignItems="center">
            <AvatarGroup people={assignedTo} n={3} width={20} height={20} />
            <Typography variant="caption">
              {assigneeCandidates.map(
                (assignee, index) =>
                  (assignee._id === loggedInUser._id ? "You" : getUserDisplayName(assignee)) +
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

        {paidBy && (
          <Typography variant="body2" color={paidBy._id === loggedInUser._id ? "green" : "error"}>
            {paidBy._id === loggedInUser._id
              ? `You are owed ${getPrettyPrice(expense?.demand || 0)} ${expense.currency} by ${
                  !assignedTo ? 0 : payerIsAssignee ? assignedTo.length - 1 : assignedTo.length
                } ${getCorrectNoun(
                  !assignedTo ? 0 : payerIsAssignee ? assignedTo.length - 1 : assignedTo.length,
                  "person",
                  "people"
                )}.`
              : `You owe ${getPrettyPrice(expense?.dong || 0)} ${
                  expense.currency
                } to ${getUserDisplayName(paidBy)}.`}
          </Typography>
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
