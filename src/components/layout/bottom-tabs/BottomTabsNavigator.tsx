import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const tabs = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Expenses", path: "/expenses" },
  { label: "Groups", path: "/groups" },
  { label: "Settings", path: "/settings" },
];

const BottomTabsNavigator = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Actives the correct tab on initial load
  useEffect(() => {
    tabs.forEach((tab, index) => {
      if (location.pathname.includes(tab.path)) {
        setActiveTab(index);
        return;
      }
    });
  }, []);

  const [activeTab, setActiveTab] = useState(0);

  return (
    <Paper elevation={3}>
      <BottomNavigation
        showLabels
        value={activeTab}
        onChange={(_event, newValue: number) => {
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
