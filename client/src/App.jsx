import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./App.css";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";
// import ProfilePage from './components/profilePage'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "./components/AppBar";
import { AuthProvider } from "./utils/authProvider";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <ResponsiveAppBar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/homepage" element={<HomePage />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/homepage" element={<HomePage />} />
              {/* <Route path="/profile/:profileId" element={<Profile />} /> */}
            </Routes>
          </div>
          {/* <Footer /> */}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
