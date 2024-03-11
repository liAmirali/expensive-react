import { useQuery } from "@tanstack/react-query";
import { getGroupsList } from "../../api/groups";
import { Box, Button, Typography } from "@mui/material";
import BackdropLoading from "../atoms/loading/BackdropLoading";
import GroupListItem from "./GroupListItem";
import { Link } from "react-router-dom";
import { MaterialSymbol } from "react-material-symbols";
import { AxiosError } from "axios";

const GroupsList = () => {
  const groupsQuery = useQuery({ queryKey: ["groups"], queryFn: getGroupsList });
  const res = groupsQuery.data?.data;

  const apiError = groupsQuery.error as AxiosError;

  const statusCode = apiError?.response?.status;

  return (
    <Box flex={1}>
      <BackdropLoading open={groupsQuery.isLoading} />

      {groupsQuery.isError ? (
        statusCode === 404 ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <MaterialSymbol icon="groups" size={100} weight={100} />
            <Typography mt={3} variant="h5">
              You are among no groups.
            </Typography>
            <Link to="create">
              <Button size="large">Try creating one yourself</Button>
            </Link>
          </Box>
        ) : (
          <Typography color="error.main">{apiError.message}</Typography>
        )
      ) : res && res.data.groups.length > 0 ? (
        res.data.groups.map((group) => <GroupListItem group={group} key={group._id} />)
      ) : (
        <></>
      )}
    </Box>
  );
};

export default GroupsList;
