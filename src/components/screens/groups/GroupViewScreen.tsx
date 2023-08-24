import { Typography } from "@mui/material";
import Screen from "../../layout/Screen";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getGroupsList } from "../../../api/groups";

const GroupViewScreen = () => {
  const {groupId} = useParams();

  const groupQuery = useQuery({
    queryKey: ["groups", "id", {id: groupId}],
    queryFn: getGroupsList
  })

  console.log(groupQuery.data);

  return <Screen topBarProps={{showBackButton: true}}>
    <Typography variant="h4">{}</Typography>
  </Screen>;
};

export default GroupViewScreen;
