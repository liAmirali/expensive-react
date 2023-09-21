import { Box, Button, Typography } from "@mui/material";
import Screen from "../../layout/Screen";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getGroupDetails } from "../../../api/groups";
import BackdropLoading from "../../atoms/loading/BackdropLoading";
import { useEffect } from "react";
import { toast } from "react-toastify";
import AvatarGroup from "../../atoms/users/AvatarGroup";
import OccasionListItem from "../../groups/OccasionListItem";
import { MaterialSymbol } from "react-material-symbols";
import CreateNew from "../../atoms/buttons/CreateNew";

const GroupViewScreen = () => {
  const { groupId } = useParams();

  const groupQuery = useQuery({
    queryKey: ["groupDetails", "groupId", { groupId: groupId! }],
    queryFn: getGroupDetails,
  });

  const groupData = groupQuery.data?.data.data;

  useEffect(() => {
    if (groupQuery.isError) {
      toast((groupQuery.error as string) || "An unknown error has occurred.", { type: "error" });
    }
  }, [groupQuery.isError, groupQuery.error]);

  return (
    <Screen topBarProps={{ showBackButton: true, rightChild: <CreateNew label="New Occasion" to="create-occasion" /> }}>
      <BackdropLoading open={groupQuery.isLoading} />
      {groupQuery.isSuccess && groupData && (
        <Box display="flex" flexDirection="column" rowGap={5}>
          <Box display="flex" alignItems="center" columnGap={2}>
            <Typography variant="h4">{groupData.group.name}</Typography>
            <AvatarGroup width={30} height={30} people={groupData.group.members as IUser[]} />
          </Box>

          <Box>
            <Typography>Occasions</Typography>
            {groupData.group.occasions.length > 0 ? (
              groupData.group.occasions.map((occasion) => (
                <OccasionListItem key={occasion._id} occasion={occasion} />
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
                <MaterialSymbol icon="groups" size={100} weight={100} />
                <Typography mt={1} variant="h5">
                  This group has no occasions in it.
                </Typography>
                <Link to="create">
                  <Button size="large">Try adding new ones</Button>
                </Link>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Screen>
  );
};

export default GroupViewScreen;
