import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReactReduxProvider } from "react-redux";
import store from "./store";
import AppRoutes from "./components/layout/AppRoutes";

const theme = createTheme();

const queryClient = new QueryClient();

const App = () => {
  return (
    <ReactReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </ReactReduxProvider>
  );
};

export default App;
