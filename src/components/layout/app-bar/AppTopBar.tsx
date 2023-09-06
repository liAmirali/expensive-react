import { AppBar, Box, Toolbar, Typography, Container, Button } from "@mui/material";
import { AdbOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import { useAppSelector } from "../../../store";
import { FC, ReactNode } from "react";
import { MaterialSymbol } from "react-material-symbols";

const pages = [
  { name: "Home", path: "/" },
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" },
];

export interface TopBarProps {
  showBackButton?: boolean;
  backTo?: string;
  backTitle?: string;
  rightChild?: ReactNode;
}

const AppTopBar: FC<TopBarProps> = ({
  showBackButton: backButton,
  backTo,
  backTitle,
  rightChild,
}) => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (backTo) navigate(backTo);
    else navigate(-1);
  };

  if (user === null) return <></>;

  return (
    <AppBar color="inherit" position="static" sx={{ zIndex: 2, boxShadow: "none" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo on desktop */}
          <AdbOutlined sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Expensive
          </Typography>

          {/* Navigation menu on desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link to={page.path} key={page.path}>
                <Button key={page.name} sx={{ my: 2, color: "white", display: "block" }}>
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>

          {/* User avatar */}
          {backButton ? (
            <Button
              sx={{
                fontSize: "large",
              }}
              onClick={handleBackClick}
              startIcon={<MaterialSymbol icon="arrow_back_ios_new" weight={100} />}
            >
              {backTitle || "Back"}
            </Button>
          ) : (
            user !== null && <UserAvatar user={user} />
          )}

          {rightChild && <Box ml="auto">{rightChild}</Box>}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppTopBar;
