import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AppSideBar from "./components/AppSideBar";
import { AuthProvider, useAuth } from "./utils/authProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import MyPosts from "./pages/MyPosts";
import Following from "./pages/Following";
import Followers from "./pages/Followers";
import Pet from "./pages/Pet";
import Home from "./pages/Home";

export default function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <BrowserRouter basename="/">
        <AppSideBar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/myPosts" element={<MyPosts />} />
            <Route path="/following" element={<Following />} />
            <Route path="/followers" element={<Followers />} />
            <Route path="/pet" element={<Pet />} />
          </Routes>
        </AppSideBar>
      </BrowserRouter>
    </AuthProvider>
  );
}
