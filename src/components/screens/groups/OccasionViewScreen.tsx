import { FC } from "react";
import Screen from "../../layout/Screen";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Box, Typography } from "@mui/material";
import AvatarGroup from "../../atoms/users/AvatarGroup";
import { getGroupDetails, getOccasionDetails } from "../../../api/groups";
import OccasionExpenseItem from "../../groups/OccasionExpenseItem";
import BackdropLoading from "../../atoms/loading/BackdropLoading";
import { getUserDisplayName } from "../../../utils/getters";

const OccasionViewScreen: FC = () => {
  const { groupId, occasionId } = useParams();

  const groupQuery = useQuery({
    queryKey: ["groupDetails", "groupId", { groupId: groupId! }],
    queryFn: getGroupDetails,
  });

  const occasionQuery = useQuery({
    queryKey: [
      "occasionDetails",
      "groupId",
      "occasionId",
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
    <Screen topBarProps={{ showBackButton: true }}>
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
            {occasionData!.expenses.map((expense) => (
              <OccasionExpenseItem
                key={expense._id}
                expense={expense}
                paidBy={members.find((member) => member._id === expense.paidBy)}
                assignedTo={members.filter((member) => expense.assignedTo.includes(member._id))}
                debtsAndDemands={debtsAndDemands!}
              />
            ))}
          </Box>
        </Box>
      ) : occasionQuery.isLoading || groupQuery.isLoading ? (
        <BackdropLoading open={true} />
      ) : (
        <Typography>No occasion was found or you don't have the access to it.</Typography>
      )}
    </Screen>
  );
};

export default OccasionViewScreen;
