import { useQuery } from "@tanstack/react-query";
import { getGroupsList } from "../../api/groups";
import { Box, Button, Typography } from "@mui/material";
import BackdropLoading from "../atoms/loading/BackdropLoading";
import GroupListItem from "./GroupListItem";
import { Link } from "react-router-dom";
import { MaterialSymbol } from "react-material-symbols";

const GroupsList = () => {
  const groupsQuery = useQuery({ queryKey: ["groups"], queryFn: getGroupsList });
  const res = groupsQuery.data?.data;

  return (
    <Box flex={1}>
      <BackdropLoading open={groupsQuery.isLoading} />

      {groupsQuery.isError ? (
        <p>Error</p>
      ) : res && res.data.groups.length > 0 ? (
        res.data.groups.map((group) => <GroupListItem group={group} key={group._id} />)
      ) : res ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <MaterialSymbol icon="groups" size={100} weight={100} />
          <Typography mt={1} variant="h5">
            You have joined no groups.
          </Typography>
          <Link to="create">
            <Button size="large">Try adding new ones</Button>
          </Link>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default GroupsList;
