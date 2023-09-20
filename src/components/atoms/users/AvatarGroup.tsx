import { AvatarGroup as MuiAvatarGroup } from "@mui/material";
import { FC } from "react";
import SingleAvatar from "./SingleAvatar";

type Props = {
  people: (
    | {
        name: string;
        imageSrc?: string;
      }
    | IUser
  )[];
  n?: number;
  width?: number;
  height?: number;
};

const AvatarGroup: FC<Props> = ({ people, n = 5, ...singleAvatarProps }) => {
  return (
    <MuiAvatarGroup total={people.length}>
      {people.slice(0, n).map((person, index) => (
        <SingleAvatar
          key={person.name + "__" + index}
          person={person}
          alt={person.name}
          {...singleAvatarProps}
        />
      ))}
    </MuiAvatarGroup>
  );
};

export default AvatarGroup;
