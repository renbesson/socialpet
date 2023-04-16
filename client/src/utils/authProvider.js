import { createContext, useState, useContext, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import decode from "jwt-decode";

let AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const cookies = new Cookies();

  ////////////////////////////////////////////////////////////////////////////////
  // Checks if client already has a valid token
  ////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    (async () => {
      const token = cookies.get("token");

      // Checks if a token exists as cookie
      if (token) {
        const { data: user, exp } = decode(token);

        // Checks if token is not expired
        if (Date.now() <= exp * 1000) {
          //Sets user state
          setUser(user);
        } else {
          // Removes expired cookie
          cookies.remove("token");
        }
      }
    })();
  }, []);

  ////////////////////////////////////////////////////////////////////////////////
  // Function for signing up
  ////////////////////////////////////////////////////////////////////////////////
  let signup = async (data) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) return await res.json();

      // Saves token as browser cookie
      const { token, message, code } = await res.json();
      const { data: user } = decode(token);
      cookies.set("token", token, { maxAge: process.env.MAX_AGE });

      // Saves user state
      setUser(user);
      return { user, message, code };
    } catch (err) {
      return err;
    }
  };

  ////////////////////////////////////////////////////////////////////////////////
  // Function for signing in
  ////////////////////////////////////////////////////////////////////////////////
  let signin = async (email, password) => {
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) return await res.json();
      console.log("signin: ", res);
      // Saves token as browser cookie
      const { token, message, code } = await res.json();
      const { data: user } = decode(token);
      cookies.set("token", token, { maxAge: process.env.MAX_AGE });

      // Saves user state
      setUser(user);
      return { user, message, code };
    } catch (err) {
      return err;
    }
  };

  ////////////////////////////////////////////////////////////////////////////////
  // Function for signing out
  ////////////////////////////////////////////////////////////////////////////////
  let signout = async (token) => {
    try {
      // Removes token as browser cookie
      cookies.remove("token");

      // Clears user state
      setUser(null);
      window.location.href = "/";
    } catch (err) {
      return err;
    }
  };

  ////////////////////////////////////////////////////////////////////////////////
  // Function for updating profile
  ////////////////////////////////////////////////////////////////////////////////
  let updateProfile = async (data) => {
    try {
      const res = await fetch(`/api/auth/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ petId: user?._id, data, token: cookies.get("token") }),
      });
      if (!res.ok) return await res.json();

      // Saves token as browser cookie
      const { token, message, code } = await res.json();
      // const { data: user } = decode(token);
      cookies.set("token", token, { maxAge: process.env.MAX_AGE });

      // Saves user state
      setUser(user);
      return { user, message, code };
    } catch (err) {
      console.log(err.message);
      return err;
    }
  };

  let value = { user, setUser, signup, signin, signout, updateProfile };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

function RequireAuth({ children }) {
  const cookies = new Cookies();
  let location = useLocation();
  const token = cookies.get("token");

  if (!token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

export { AuthProvider, useAuth, RequireAuth };
