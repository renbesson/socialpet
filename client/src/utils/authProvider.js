import { createContext, useState, useContext, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import decode from 'jwt-decode';

let AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const cookies = new Cookies();

  // Checks if client already has a valid token
  useEffect(() => {
    const token = cookies.get('token');

    // Checks if a token exists as cookie
    if (token) {
      const { data: user, exp } = decode(token);

      // Checks if token is not expired
      if (Date.now() <= exp * 1000) {
        //Sets user state
        setUser(user);
      } else {
        // Removes expired cookie
        cookies.remove('token');
      }
    }
  }, []);

  let signin = async (email, password) => {
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      // Saves token as browser cookie
      const { token } = await res.json();
      const { data: user } = decode(token);
      cookies.set('token', token, { maxAge: process.env.MAX_AGE });

      // Saves user state
      setUser(user);
      console.log(user);
    } catch (err) {
      console.error(err);
    }
  };

  let signout = async (token) => {
    try {
      // Removes token as browser cookie
      cookies.remove('token');

      // Clears user state
      setUser(null);
      window.location.href = '/';
    } catch (err) {
      console.error(err);
    }
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

/* function AuthStatus() {
  let auth = useAuth();
  // let navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user}
      <button
        onClick={() => {
          auth.signout(() => navigate('/'));
        }}
      >
        Sign out
      </button>
    </p>
  );
} */

function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export { AuthProvider, useAuth };
