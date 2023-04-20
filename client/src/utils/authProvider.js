import { createContext, useState, useContext, useEffect, useMemo } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import decode from "jwt-decode";
import { toast } from "react-toastify";

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
        const { data: userToken, exp } = decode(token);

        // Checks if token is not expired
        if (Date.now() <= exp * 1000) {
          //Gets user data sets user state
          try {
            const res = await fetch(`/api/pet/?petId=${userToken?._id}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token: cookies.get("token") }),
            });
            const { pet } = await res.json();

            setUser(pet);
          } catch (err) {
            toast(err.message);
          }
        } else {
          // Removes expired cookie
          cookies.remove("token");
        }
      }
    })();
  }, [cookies, user?.avatar]);

  console.log("effect");
  let value = { user, setUser };

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
