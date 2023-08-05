import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const tabs = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Personal", path: "/personal" },
  { label: "Groups", path: "/groups" },
  { label: "Settings", path: "/settings" },
];

const BottomTabsNavigator = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Actives the correct tab on initial load 
  useEffect(() => {
    tabs.forEach((tab, index) => {
      if (tab.path === location.pathname)
        setActiveTab(index);
    })
  }, []) 
  
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
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
