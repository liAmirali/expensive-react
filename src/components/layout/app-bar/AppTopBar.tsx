import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
} from "@mui/material";
import { AdbOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import { useAppSelector } from "../../../store";

const pages = [
  { name: "Home", path: "/" },
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" },
];

const AppTopBar = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <AppBar position="static">
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

          {/* Logo on mobile */}
          <AdbOutlined sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
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
              <Link to={page.path}>
                <Button
                  key={page.name}
                  sx={{ my: 2, color: "white", display: "block" }}
                  >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>

          {/* User avatar */}
          {user === null ? <Link to="/login">Login</Link> : <UserAvatar user={user} />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppTopBar;
