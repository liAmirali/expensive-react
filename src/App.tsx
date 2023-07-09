import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoginScreen from "./components/screens/LoginScreen";
import HomeScreen from "./components/screens/HomeScreen";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import RegisterScreen from "./components/screens/RegisterScreen";
import { SWRConfig } from "swr";
import { swrGlobalConfig } from "./api/config";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    path: "/register",
    element: <RegisterScreen />,
  },
]);

const theme = createTheme();

const App = () => {
  return (
    <SWRConfig value={swrGlobalConfig}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </ThemeProvider>
    </SWRConfig>
  );
};

export default App;
