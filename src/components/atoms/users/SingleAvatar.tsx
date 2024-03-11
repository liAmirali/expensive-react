import { Avatar, AvatarProps, SxProps } from "@mui/material";
import { FC } from "react";

export type SingleAvatarProps = {
  person:
    | {
        name: string;
        imageSrc?: string;
      }
    | IUser;
  width?: number;
  height?: number;
  sx?: SxProps;
} & AvatarProps;

const SingleAvatar: FC<SingleAvatarProps> = ({ person, width, height, sx, ...props }) => {
  return (
    <Avatar
      alt={person.name}
      src={
        "imageSrc" in person && person.imageSrc
          ? person.imageSrc
          : "profilePicture" in person && person.profilePicture
          ? person.profilePicture
          : "#"
      }
      sx={{ width, height, fontSize: width && width / 2, ...sx }}
      {...props}
    />
  );
};

export default SingleAvatar;
