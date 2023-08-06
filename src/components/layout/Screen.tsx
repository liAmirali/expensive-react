import { Box } from "@mui/material";
import AppTopBar, { TopBarProps } from "./app-bar/AppTopBar";
import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  topBarProps?: TopBarProps;
}

const Screen: FC<Props> = ({ children, topBarProps }) => {
  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      <AppTopBar {...topBarProps} />
      <Box flexGrow={1} py={2} px={3}>
        {children}
      </Box>
    </Box>
  );
};
export default Screen;
