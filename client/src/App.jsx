// import logo from './logo.svg';
import "./App.css";
import LandingPage from "./components/landingPage";
import Login from "./components/login";
import SignUp from "./components/signup";
import FeedCard from "./components/feedCard";
// import ProfilePage from './components/profilePage'
// import Feed from

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/profile/:id",
    element: <SignUp />,
  },
  {
    path: "/feedcard",
    element: (
      <FeedCard
        pet={{ Name: "Cat" }}
        content="Cat content"
        imageUrl="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1286&q=80"
      />
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
