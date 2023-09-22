import {
  Avatar,
  Button,
  FormControlLabel,
  Checkbox,
  Link,
  Box,
  Typography,
  Container,
} from "@mui/material";
import FormikInput from "../atoms/inputs/formik/FormikInput";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/auth";
import { Link as RouterLink } from "react-router-dom";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { AxiosError } from "axios";
import { ApiResponse } from "../../api/config";
import { useAppDispatch } from "../../store";
import { authActions } from "../../store/auth";

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginForm = () => {
  const dispatch = useAppDispatch();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess({ data }) {
      window.localStorage.setItem("accessToken", data.data.accessToken);
      dispatch(authActions.setUser(data.data.user));
    },
  });
  const error = mutation.error
    ? (mutation.error as AxiosError<ApiResponse>).response?.data
    : undefined;

  const handleSubmit = async (values: LoginForm) => {
    const email = values.email;
    const password = values.password;

    console.log({
      email: email,
      password: password,
    });

    mutation.mutate({ email, password });
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Please enter your account's email."),
    password: Yup.string().required("Please enter your account's password."),
  });

  const formik = useFormik<LoginForm>({
    initialValues: { email: "", password: "", rememberMe: false },
    validationSchema,
    onSubmit: handleSubmit,
    validateOnBlur: false,
    validateOnMount: false,
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 8,
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
        {/* Form */}
        <FormikProvider value={formik}>
          <Box component="form" noValidate onSubmit={formik.handleSubmit} mt={1} width={"80%"}>
            <FormikInput
              name="email"
              label="Email Address"
              type="email"
              id="email"
              autoComplete="email"
              required
              fullWidth
              autoFocus
              margin="normal"
            />
            <FormikInput
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              fullWidth
              margin="normal"
              boxProps={{ mt: 2 }}
            />
            <FormControlLabel
              name="rememberMe"
              checked={formik.values.rememberMe}
              onChange={formik.handleChange}
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              sx={{ mt: 2 }}
            />
            {error && (
              <Typography mt={2} color="error">
                {error.message || "Failed to login."}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4 }}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Please wait..." : "Sign In"}
            </Button>
          </Box>
        </FormikProvider>

        <Box display="flex" flexDirection="column" alignItems="start" mt={4} width={"80%"}>
          <Link component={RouterLink} to="#">
            Forgot password?
          </Link>

          <Link component={RouterLink} to="/register">
            {"Don't have an account? Sign Up"}
          </Link>
        </Box>
      </Box>

      {/* <Copyright /> */}
    </Container>
  );
};

export default LoginForm;
