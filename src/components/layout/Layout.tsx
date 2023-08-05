import { Outlet } from "react-router-dom";
import Navbar from "./app-bar/AppTopBar";
import { Box } from "@mui/material";
import BottomTabsNavigator from "./bottom-tabs/BottomTabsNavigator";

const Layout = () => {
  return (
    <Box height="100vh">
      <Navbar />
      <Box height="90vh">
        <Outlet />
      </Box>
      <BottomTabsNavigator />
    </Box>
  );
};

export default Layout;
