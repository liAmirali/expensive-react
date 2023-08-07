import { useQuery } from "@tanstack/react-query";
import { getGroupsList } from "../../api/groups";
import { Box } from "@mui/material";
import BackdropLoading from "../atoms/loading/BackdropLoading";
import GroupListItem from "./GroupListItem";

const GroupsList = () => {
  const groupsQuery = useQuery({ queryKey: ["groups"], queryFn: getGroupsList });
  const res = groupsQuery.data?.data;

  console.log("GROUPS QRY ERR", groupsQuery.error);

  return (
    <Box>
      <BackdropLoading open={groupsQuery.isLoading} />

      {groupsQuery.isError ? (
        <p>Error</p>
      ) : res && res.data.groups.length > 0 ? (
        res.data.groups.map((group) => <GroupListItem group={group} />)
      ) : (
        <p>no groups</p>
      )}
    </Box>
  );
};

export default GroupsList;
