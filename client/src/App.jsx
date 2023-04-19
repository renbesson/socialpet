import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./App.css";

import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Signout from "./pages/Signout";
import Profile from "./pages/Profile";
import Following from "./pages/Following";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import ResponsiveAppBar from "./components/AppBar";
import { AuthProvider } from "./utils/authProvider";
import MyPosts from "./pages/MyPosts";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import FeedLayout from "./pages/layouts/FeedLayout";

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
      <AuthProvider>
        <Router>
          <FeedLayout />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
