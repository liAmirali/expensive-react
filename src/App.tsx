import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoginScreen from "./components/screens/LoginScreen";
import HomeScreen from "./components/screens/HomeScreen";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import RegisterScreen from "./components/screens/RegisterScreen";
import { SWRConfig } from "swr";
import { swrGlobalConfig } from "./api/config";

const theme = createTheme();

const App = () => {
  return (
    <SWRConfig value={swrGlobalConfig}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomeScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </SWRConfig>
  );
};

export default App;
