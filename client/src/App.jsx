import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Signout from "./pages/Signout";
import Profile from "./pages/Profile";
import Following from "./pages/Following";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "./components/AppBar";
import { AuthProvider } from "./utils/authProvider";
import MyPosts from "./pages/MyPosts";

import { createTheme, ThemeProvider } from "@mui/material/styles";

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
          <ToastContainer />
          <ResponsiveAppBar />
          <div style={{marginTop: '5rem'}}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signout" element={<Signout />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/following" element={<Following />} />
              <Route path="/myPosts" element={<MyPosts />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
