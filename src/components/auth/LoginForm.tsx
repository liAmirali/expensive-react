import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link as LinkMUI,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "../atoms/general/Copyright";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/auth";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess(data, variables, context) {
      console.log("Successful");
      console.log("data :>> ", data);
      console.log("variables :>> ", variables);
      console.log("context :>> ", context);
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    console.log({
      email: email,
      password: password,
    });

    mutation.mutate({ email, password });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <LinkMUI variant="body2">
                <Link to="#">Forgot password?</Link>
              </LinkMUI>
            </Grid>
            <Grid item>
              <LinkMUI variant="body2">
                <Link to="/register">{"Don't have an account? Sign Up"}</Link>
              </LinkMUI>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default LoginForm;
