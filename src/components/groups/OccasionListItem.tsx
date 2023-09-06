import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { MaterialSymbol } from "react-material-symbols";
import { getCorrectNoun } from "../../utils/getters";

type Props = {
  occasion: IOccasion;
};

const OccasionListItem: FC<Props> = ({ occasion }) => {
  return (
    <Box
      display="flex"
      sx={{ backgroundColor: "white", borderRadius: 3, border: "1px #f0f0f0 solid", p: 2, mb: 2 }}
    >
      {/* Group Picture */}
      <Box display="flex" alignItems="center" mr={2}>
        <MaterialSymbol icon="group" weight={100} size={40} />
      </Box>

      {/* Group info */}
      <Box flexGrow={1}>
        <Typography variant="h6">{occasion.name}</Typography>
        <Typography variant="caption">
          {occasion.members.length +
            " " +
            getCorrectNoun(occasion.members.length, "member", "members") +
            " | " +
            occasion.expenses.length +
            " " +
            getCorrectNoun(occasion.expenses.length, "expense", "expenses")}
        </Typography>
        <Box></Box>
      </Box>

      <Box>
        <Typography variant="h6" color={"error"}>
          -68.99
        </Typography>
        <Typography align="right">USD</Typography>
      </Box>
    </Box>
  );
};

export default OccasionListItem;
