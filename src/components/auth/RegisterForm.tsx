import { Avatar, Box, Button, Container, Typography, Link } from "@mui/material";
import * as Yup from "yup";
import { LockOutlined } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/auth";
import { AxiosError } from "axios";
import { ApiResponse } from "../../api/config";
import { useFormik } from "formik";
import Input from "../atoms/inputs/formik/Input";

interface RegisterForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const RegisterForm = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess() {
      navigate("/login");
    },
  });
  const error = !!mutation.error
    ? (mutation.error as AxiosError<ApiResponse>).response?.data
    : undefined;

  const handleSubmit = (values: RegisterForm) => {
    const { email, password, firstName, lastName } = values;

    console.log({
      email: email,
      password: password,
    });

    mutation.mutate({ email, password, firstName, lastName });
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Please enter your account's email."),
    password: Yup.string().required("Please enter your account's password."),
    firstName: Yup.string().required("Please enter your first name."),
  });

  const formik = useFormik<RegisterForm>({
    initialValues: { email: "", password: "", firstName: "", lastName: "" },
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
        <Box component="form" noValidate onSubmit={formik.handleSubmit} mt={1} width={"80%"}>
          <Input
            formik={formik}
            margin="normal"
            required
            fullWidth
            name="firstName"
            label="First Name"
            type="text"
            id="first-name"
            autoComplete="given-name"
            boxProps={{ mt: 2 }}
          />
          <Input
            formik={formik}
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Last Name"
            type="text"
            id="last-name"
            autoComplete="family-name"
            boxProps={{ mt: 2 }}
          />
          <Input
            formik={formik}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            boxProps={{ mt: 2 }}
          />
          <Input
            formik={formik}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
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
