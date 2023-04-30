import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

let AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);

  ////////////////////////////////////////////////////////////////////////////////
  // Checks if client already has a valid token
  ////////////////////////////////////////////////////////////////////////////////
  const fetchPet = async () => {
    try {
      const res = await fetch(`/api/auth/fetchPet`);
      const { pet } = await res.json();

      setUser(pet);
    } catch (err) {
      console.error(err);
      toast(err.message);
    }
  };

  useEffect(() => {
    fetchPet();
  }, []);

  let value = { user, fetchPet };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
