import { Avatar, AvatarGroup as MuiAvatarGroup } from "@mui/material";
import { FC } from "react";

type Props = {
  people: {
    name: string;
    imageSrc?: string;
  }[];
  n?: number;
  width?: number;
  height?: number;
};

const AvatarGroup: FC<Props> = ({ people, n = 5, width, height }) => {
  return (
    <MuiAvatarGroup total={people.length}>
      {people.slice(0, n).map((person, index) => (
        <Avatar
          alt={person.name}
          src={person.imageSrc || "#"}
          key={person.name + "__" + index}
          sx={{ width, height, fontSize: width && width / 2 }}
        />
      ))}
    </MuiAvatarGroup>
  );
};

export default AvatarGroup;
