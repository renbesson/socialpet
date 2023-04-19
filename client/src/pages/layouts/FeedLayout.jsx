import { Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "../../components/AppBar";

import Signin from "../Signin";
import Signup from "../Signup";
import Signout from "../Signout";
import Profile from "../Profile";
import MyPosts from "../MyPosts";
import Following from "../Following";
import Followers from "../Followers";
import Pet from "../Pet";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../utils/authProvider";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import Feed from "../../components/Feed";

export default function Layout({ children }) {
  const { user } = useAuth();
  return (
    <>
      <ResponsiveAppBar />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {user && <Sidebar />}

        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signout" element={<Signout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/myPosts" element={<MyPosts />} />
          <Route path="/following" element={<Following />} />
          <Route path="/followers" element={<Followers />} />
          <Route path="/pet" element={<Pet />} />
        </Routes>
      </Box>
      <Toolbar />
    </>
  );
}
