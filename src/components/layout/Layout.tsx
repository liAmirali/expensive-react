import { Outlet } from "react-router-dom";
import Navbar from "./app-bar/AppTopBar";
import { Box } from "@mui/material";
import BottomTabsNavigator from "./bottom-tabs/BottomTabsNavigator";
import { useAppSelector } from "../../store";

const Layout = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Box height="100vh">
      <Navbar />
      <Box height="90vh">
        <Outlet />
      </Box>
      {user !== null && <BottomTabsNavigator />}
    </Box>
  );
};

export default Layout;
