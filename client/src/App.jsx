import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.css';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Signout from './pages/Signout';
import FeedCard from './components/feedCard';
// import ProfilePage from './components/profilePage'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './components/AppBar';
import { AuthProvider } from './utils/authProvider';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <ResponsiveAppBar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signout" element={<Signout />} />
              {/* <Route path="/profile/:profileId" element={<Profile />} /> */}
              <Route
                path="/feedcard"
                element={
                  <FeedCard
                    pet={{ Name: 'Cat' }}
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
  );
}

export default App;
