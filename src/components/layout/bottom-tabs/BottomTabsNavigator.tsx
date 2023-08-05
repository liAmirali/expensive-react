import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const tabs = [
  { label: "Personal", path: "/personal" },
  { label: "Groups", path: "/groups" },
  { label: "Settings", path: "/settings" },
];

const BottomTabsNavigator = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={activeTab}
        onChange={(event, newValue: number) => {
          setActiveTab(newValue);
          navigate(tabs[newValue].path);
        }}
      >
        {tabs.map((tab, index) => (
          <BottomNavigationAction label={tab.label} value={index} />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default BottomTabsNavigator;
