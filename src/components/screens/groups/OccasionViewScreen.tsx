import { FC } from "react";
import Screen from "../../layout/Screen";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getGroupDetails } from "../../../api/groups";
import { Box, Typography } from "@mui/material";
import AvatarGroup from "../../atoms/users/AvatarGroup";
import ExpenseItem from "../../personal/ExpenseItem";

const OccasionViewScreen: FC = () => {
  const { groupId, occasionId } = useParams();

  const groupQuery = useQuery({
    queryKey: ["groupDetails", "groupId", { groupId: groupId! }],
    queryFn: getGroupDetails,
  });

  const groupData = groupQuery.data?.data.data.group;
  const occasionData = groupData?.occasions.find((i) => i._id === occasionId);

  const members =
    groupData && occasionData
      ? (groupData.members as IUser[]).filter((member) =>
          (occasionData.members as string[]).includes(member._id)
        )
      : [];

  console.log("groupId :>> ", groupId);
  console.log("occasionId :>> ", occasionId);
  console.log('occasionData :>> ', occasionData);

  return (
    <Screen topBarProps={{ showBackButton: true }}>
      {occasionData ? (
        <Box display="flex" flexDirection="column" rowGap={5}>
          <Box display="flex" alignItems="center" columnGap={2}>
            <Typography variant="h4">{occasionData.name}</Typography>
            <AvatarGroup people={members.map((m) => ({ name: m.name }))} width={30} height={30} />
          </Box>

          <Box>
            <Typography>Expenses</Typography>
            {occasionData.expenses.map((expense) => (
              <ExpenseItem expense={expense} />
            ))}
          </Box>
        </Box>
      ) : (
        <Typography>No occasion was found or you don't have the access to it.</Typography>
      )}
    </Screen>
  );
};

export default OccasionViewScreen;
