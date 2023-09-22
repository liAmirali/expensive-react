import { FC } from "react";
import Screen from "../../layout/Screen";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Box, Button, Typography } from "@mui/material";
import AvatarGroup from "../../atoms/users/AvatarGroup";
import { getGroupDetails, getOccasionDetails } from "../../../api/groups";
import OccasionExpenseItem from "../../groups/OccasionExpenseItem";
import BackdropLoading from "../../atoms/loading/BackdropLoading";
import { getUserDisplayName } from "../../../utils/getters";
import { MaterialSymbol } from "react-material-symbols";
import CreateNew from "../../atoms/buttons/CreateNew";

const OccasionViewScreen: FC = () => {
  const { groupId, occasionId } = useParams();

  const groupQuery = useQuery({
    queryKey: ["groupDetails", "groupId", { groupId: groupId! }],
    queryFn: getGroupDetails,
  });

  const occasionQuery = useQuery({
    queryKey: [
      "occasionDetails",
      { groupId: groupId!, occasionId: occasionId! },
    ],
    queryFn: getOccasionDetails,
  });

  const groupData = groupQuery.data?.data.data.group;
  const occasionData = occasionQuery.data?.data.data.occasion;
  const debtsAndDemands = occasionQuery.data?.data.data.debtsAndDemands;

  const members =
    groupData && occasionData
      ? (groupData.members as IUser[]).filter((member) =>
          (occasionData.members as string[]).includes(member._id)
        )
      : [];

  console.log("groupId :>> ", groupId);
  console.log("occasionId :>> ", occasionId);
  console.log("occasionData :>> ", occasionData);

  return (
    <Screen
      topBarProps={{
        showBackButton: true,
        rightChild: <CreateNew label="Add Expense" to="add-expense" />,
      }}
    >
      {occasionQuery.isSuccess && groupQuery.isSuccess ? (
        <Box display="flex" flexDirection="column" rowGap={5}>
          <Box display="flex" alignItems="center" columnGap={2}>
            <Typography variant="h4">{occasionData!.name}</Typography>
            <AvatarGroup
              people={members.map((m) => ({ name: getUserDisplayName(m) }))}
              width={30}
              height={30}
            />
          </Box>

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
        <Typography>No occasion was found or you don&apos;t have the access to it.</Typography>
      )}
    </Screen>
  );
};

export default OccasionViewScreen;
