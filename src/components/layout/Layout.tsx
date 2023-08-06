import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import BottomTabsNavigator from "./bottom-tabs/BottomTabsNavigator";
import { useAppSelector } from "../../store";

const Layout = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Outlet />

      {user !== null && <BottomTabsNavigator />}
    </Box>
  );
};

export default Layout;
