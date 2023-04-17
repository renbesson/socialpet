import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import Home from "./pages/Home";
import HomePage from "./pages/HomePage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Signout from "./pages/Signout";
import Profile from "./pages/Profile";
import FeedCard from "./components/feedCard";

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
          <div className="flex-column justify-flex-start min-100-vh">
            <ResponsiveAppBar />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signout" element={<Signout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/myPosts" element={<MyPosts />} />
                <Route
                  path="/feedcard"
                  element={
                    <FeedCard
                      pet={{ Name: "Cat" }}
                      content="Cat content"
                      imageUrl="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1286&q=80"
                    />
                  }
                />
              </Routes>
            </div>
            {/* <Footer /> */}
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
