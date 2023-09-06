import { Box, Typography } from "@mui/material";
import Screen from "../../layout/Screen";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getGroupDetails } from "../../../api/groups";
import BackdropLoading from "../../atoms/loading/BackdropLoading";
import { useEffect } from "react";
import { toast } from "react-toastify";
import AvatarGroup from "../../atoms/users/AvatarGroup";
import OccasionListItem from "../../groups/OccasionListItem";

const GroupViewScreen = () => {
  const { groupId } = useParams();

  const groupQuery = useQuery({
    queryKey: ["groupDetails", "groupId", { groupId: groupId! }],
    queryFn: getGroupDetails,
  });

  const groupData = groupQuery.data?.data.data;
  console.log("groupData :>> ", groupData);

  useEffect(() => {
    if (groupQuery.isError) {
      toast((groupQuery.error as string) || "An unknown error has occurred.", { type: "error" });
    }
  }, [groupQuery.isError]);

  return (
    <Screen topBarProps={{ showBackButton: true }}>
      <BackdropLoading open={groupQuery.isLoading} />
      {groupQuery.isSuccess && groupData && (
        <Box display="flex" flexDirection="column" rowGap={5}>
          <Box display="flex" alignItems="center" columnGap={2}>
            <Typography variant="h4">{groupData.group.name}</Typography>
            <AvatarGroup
              width={30}
              height={30}
              people={(groupData.group.members as IUser[]).map((item) => ({ name: item.name }))}
            />
          </Box>

          <Box>
            <Typography>Occasions</Typography>
            {groupData.group.occasions.map((occasion) => (
              <OccasionListItem occasion={occasion} key={occasion._id} />
            ))}
          </Box>
        </Box>
      )}
    </Screen>
  );
};

export default GroupViewScreen;
