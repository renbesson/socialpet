import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./utils/authProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FeedLayout from "./pages/layouts/FeedLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const themeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#8093f1",
    },
    secondary: {
      main: "#f7aef8",
    },
    info: {
      main: "#72ddf7",
    },
  },
};

const theme = createTheme(themeOptions);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <AuthProvider>
        <Router>
          <FeedLayout />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
