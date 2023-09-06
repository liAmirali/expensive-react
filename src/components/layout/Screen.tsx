import { Box, Container } from "@mui/material";
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
      <Box bgcolor="#f5f5f5" flexGrow={1} py={2}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            height: "100%",
          }}
          maxWidth="xl"
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
};
export default Screen;
