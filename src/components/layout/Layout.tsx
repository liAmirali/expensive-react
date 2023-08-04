import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <Box height="100vh">
      <Navbar />
      <Box height="90vh">
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
