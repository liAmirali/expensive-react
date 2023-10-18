import { Box, Button } from "@mui/material";
import Screen from "../layout/Screen";
import { useNavigate } from "react-router-dom";

const SettingsScreen = () => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    window.localStorage.removeItem("accessToken");

    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  return (
    <Screen>
      <Box>
        <Button variant="contained" fullWidth onClick={handleLogoutClick}>
          Logout
        </Button>
      </Box>
    </Screen>
  );
};

export default SettingsScreen;
