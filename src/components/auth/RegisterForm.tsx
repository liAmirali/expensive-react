import { Avatar, Box, Button, Container, Typography, Link } from "@mui/material";
import * as Yup from "yup";
import { LockOutlined } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/auth";
import { AxiosError } from "axios";
import { ApiResponse } from "../../api/config";
import { FormikProvider, useFormik } from "formik";
import FormikInput from "../atoms/inputs/formik/FormikInput";

interface RegisterForm {
  name: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const RegisterForm = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess() {
      navigate("/login");
    },
  });
  const error = mutation.error
    ? (mutation.error as AxiosError<ApiResponse>).response?.data
    : undefined;

  const handleSubmit = (values: RegisterForm) => {
    const { email, password, name, username } = values;

    mutation.mutate({ email, password, name, username });
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Please enter your account's email."),
    name: Yup.string().required("Please enter your name."),
    username: Yup.string().required("Please enter your username."),
    password: Yup.string()
      .required("Please enter your account's password.")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    passwordConfirmation: Yup.string().oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const formik = useFormik<RegisterForm>({
    initialValues: { email: "", name: "", username: "", password: "", passwordConfirmation: "" },
    validationSchema,
    onSubmit: handleSubmit,
    validateOnBlur: false,
    validateOnMount: false,
  });

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
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        {/* Form */}
        <FormikProvider value={formik}>
          <Box component="form" noValidate onSubmit={formik.handleSubmit} mt={1} width={"80%"}>
            <FormikInput
              name="name"
              label="Name"
              type="text"
              id="name"
              autoComplete="given-name"
              fullWidth
              margin="normal"
              boxProps={{ mt: 2 }}
            />
            <FormikInput
              name="username"
              label="Username"
              type="text"
              id="username"
              autoComplete="username"
              fullWidth
              margin="normal"
              boxProps={{ mt: 2 }}
            />
            <FormikInput
              name="email"
              label="Email Address"
              id="email"
              type="email"
              autoComplete="email"
              margin="normal"
              fullWidth
              boxProps={{ mt: 2 }}
            />
            <FormikInput
              name="password"
              label="Password"
              type="password"
              id="password"
              margin="normal"
              autoComplete="new-password"
              fullWidth
              boxProps={{ mt: 2 }}
            />
            <FormikInput
              name="passwordConfirmation"
              label="Repeat Password"
              type="password"
              id="password-confirmation"
              margin="normal"
              autoComplete="new-password"
              fullWidth
              boxProps={{ mt: 2 }}
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
              {mutation.isLoading ? "Please wait..." : "Register"}
            </Button>
          </Box>
        </FormikProvider>

        <Box display="flex" flexDirection="column" alignItems="start" mt={4} width={"80%"}>
          <Link component={RouterLink} to="/login">
            {"Already registered? Log in!"}
          </Link>
        </Box>
      </Box>

      {/* <Copyright sx={{ mt: 5 }} /> */}
    </Container>
  );
};
export default RegisterForm;
