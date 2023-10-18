import { Box, Typography } from "@mui/material";
import { MaterialSymbol } from "react-material-symbols";
import { getUserDisplayName } from "../../utils/getters";
import { FC } from "react";
import AvatarGroup from "../atoms/users/AvatarGroup";

type Props = {
  occasionName: string;
  members: IUser[];
};

const OccasionViewHeader: FC<Props> = ({ occasionName, members }) => {
  const handleOccasionDeleteClick = () => {};

  return (
    <Box display="flex" alignItems="center" columnGap={2}>
      <Typography variant="h4">{occasionName}</Typography>

      <AvatarGroup
        people={members.map((m) => ({ name: getUserDisplayName(m) }))}
        width={30}
        height={30}
      />

      <Box ml="auto" className="space-x-2">
        <MaterialSymbol icon="edit" weight={200} size={25} className="text-neutral-800" />
        <MaterialSymbol
          icon="delete"
          weight={200}
          size={25}
          className="text-red-600"
          onClick={handleOccasionDeleteClick}
        />
      </Box>
    </Box>
  );
};

export default OccasionViewHeader;
