import { FC } from "react";
import Screen from "../../layout/Screen";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Box, Button, Typography } from "@mui/material";
import { getGroupDetails, getOccasionDetails } from "../../../api/groups";
import OccasionExpenseItem from "../../groups/OccasionExpenseItem";
import BackdropLoading from "../../atoms/loading/BackdropLoading";
import { MaterialSymbol } from "react-material-symbols";
import CreateNew from "../../atoms/buttons/CreateNew";
import { AxiosError } from "axios";
import { ApiResponse } from "../../../api/config";
import OccasionViewHeader from "../../groups/OccasionViewHeader";

const OccasionViewScreen: FC = () => {
  const { groupId, occasionId } = useParams();

  const groupQuery = useQuery({
    queryKey: ["groupDetails", "groupId", { groupId: groupId! }],
    queryFn: getGroupDetails,
  });

  const occasionQuery = useQuery({
    queryKey: ["occasionDetails", { groupId: groupId!, occasionId: occasionId! }],
    queryFn: getOccasionDetails,
  });
  const occasionQueryError = occasionQuery.error as AxiosError<ApiResponse>;

  const groupData = groupQuery.data?.data.data.group;
  const occasionData = occasionQuery.data?.data.data.occasion;
  const debtsAndDemands = occasionQuery.data?.data.data.debtsAndDemands;

  console.log('debtsAndDemands :>> ', debtsAndDemands);

  const members =
    groupData && occasionData
      ? (groupData.members as IUser[]).filter((member) =>
          (occasionData.members as string[]).includes(member._id)
        )
      : [];

  return (
    <Screen
      topBarProps={{
        showBackButton: true,
        rightChild: <CreateNew label="Add Expense" to="add-expense" />,
      }}
    >
      {occasionQuery.isSuccess && groupQuery.isSuccess ? (
        <Box display="flex" flexDirection="column" rowGap={5}>
          <OccasionViewHeader members={members} occasionName={occasionData!.name} />

          <Box>
            <Typography mb={2}>Occasion Expenses</Typography>
            {occasionData!.expenses.length > 0 ? (
              occasionData!.expenses.map((expense) => (
                <OccasionExpenseItem
                  key={expense._id}
                  expense={expense}
                  paidBy={members.find((member) => member._id === expense.paidBy)}
                  assignedTo={members.filter((member) => expense.assignedTo.includes(member._id))}
                  debtsAndDemands={debtsAndDemands!}
                />
              ))
            ) : (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100%"
                mt={4}
              >
                <MaterialSymbol icon="production_quantity_limits" size={100} weight={100} />
                <Typography mt={1} variant="h5">
                  Oh! No expenses in this occasion?
                </Typography>
                <Link to="add-expense">
                  <Button size="large">Try adding new ones</Button>
                </Link>
              </Box>
            )}
          </Box>
        </Box>
      ) : occasionQuery.isLoading || groupQuery.isLoading ? (
        <BackdropLoading open={true} />
      ) : (
        <Typography>
          {occasionQueryError.response?.data.message ||
            "No occasion was found or you don&apos;t have the access to it."}
        </Typography>
      )}
    </Screen>
  );
};

export default OccasionViewScreen;
