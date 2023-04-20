import { Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "../../components/AppBar";

import Signin from "../Signin";
import Signup from "../Signup";
import MyPosts from "../MyPosts";
import Following from "../Following";
import Followers from "../Followers";
import Pet from "../Pet";
import { CssBaseline, Toolbar } from "@mui/material";
import Home from "../Home";

export default function Layout() {
  return (
    <>
      <ResponsiveAppBar />

      <CssBaseline />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/myPosts" element={<MyPosts />} />
        <Route path="/following" element={<Following />} />
        <Route path="/followers" element={<Followers />} />
        <Route path="/pet" element={<Pet />} />
      </Routes>

      <Toolbar />
    </>
  );
}
