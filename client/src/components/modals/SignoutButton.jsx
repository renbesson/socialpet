import React from "react";
import { useAuth } from "../../utils/authProvider";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function SignOutButton() {
  const { fetchPet } = useAuth();
  let navigate = useNavigate();

  ////////////////////////////////////////////////////////////////////////////////
  // Function for signing out
  ////////////////////////////////////////////////////////////////////////////////
  let handleSignOut = async () => {
    try {
      // Removes token as browser cookie
      const res = await fetch("/api/auth/signout");

      if (!res.ok) return toast("Signout unsuccessful.");
      if (res.status === 200) {
        // Clears user state
        await fetchPet();

        navigate("/", { replace: true });
      }
    } catch (err) {
      return err;
    }
  };

  return <Link onClick={handleSignOut}>Sign Out</Link>;
}
