import { createContext, useState, useContext, useEffect, useMemo } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import decode from "jwt-decode";

let AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const cookies = useMemo(() => new Cookies(), []);
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
  }, [cookies]);

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



  let value = { user, setUser, signout };

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
