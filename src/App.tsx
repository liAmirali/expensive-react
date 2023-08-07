import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReactReduxProvider } from "react-redux";
import store from "./store";
import RootRouter from "./components/routers/RootRouter";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { theme } from "./styles/theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // For react-toastify
import "react-material-symbols/dist/rounded.css"; // For react-material-symbols
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const queryClient = new QueryClient();

const App = () => {
  return (
    <ReactReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CssBaseline />
            <ToastContainer closeButton={false} />
            <BrowserRouter>
              <RootRouter />
            </BrowserRouter>
          </LocalizationProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ReactReduxProvider>
  );
};

export default App;
