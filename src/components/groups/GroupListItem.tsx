import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { getCorrectNoun } from "../../utils/getters";
import { MaterialSymbol } from "react-material-symbols";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store";

interface Props {
  group: IGroup;
}

const GroupListItem: FC<Props> = ({ group }) => {
  const userId = useAppSelector((state) => state.auth.user?._id);

  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(group._id);
  };

  const net =
    userId && group.debtsAndDemands && group.debtsAndDemands[userId]
      ? group.debtsAndDemands[userId].demand - group.debtsAndDemands[userId].debt
      : 0;

  return (
    <Box
      display="flex"
      sx={{ backgroundColor: "white", borderRadius: 3, border: "1px #f0f0f0 solid", p: 2, mb: 2 }}
      onClick={handleItemClick}
    >
      {/* Group Picture */}
      <Box display="flex" alignItems="center" mr={2}>
        <MaterialSymbol icon="group" weight={100} size={40} />
      </Box>

      {/* Group info */}
      <Box flexGrow={1}>
        <Typography variant="h6">{group.name}</Typography>
        <Typography variant="caption">
          {group.members.length +
            " " +
            getCorrectNoun(group.members.length, "member", "members") +
            " | " +
            group.occasions.length +
            " " +
            getCorrectNoun(group.occasions.length, "occasion", "occasions")}
        </Typography>
        <Box></Box>
      </Box>

      <Box>
        <Typography variant="h6" color={net < 0 ? "error" : "green"}>
          {net}
        </Typography>
        <Typography align="right">IRT(?)</Typography>
      </Box>
    </Box>
  );
};

export default GroupListItem;
