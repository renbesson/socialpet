import React from "react";
import Cookies from "universal-cookie";
import { Box, Button } from "@mui/material";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import { useAuth } from "../../utils/authProvider";

export default function SignOutButton() {
  const { fetchUser } = useAuth();
  const cookies = new Cookies();

  ////////////////////////////////////////////////////////////////////////////////
  // Function for signing out
  ////////////////////////////////////////////////////////////////////////////////
  let handleSignOut = async () => {
    try {
      // Removes token as browser cookie
      cookies.remove("token");

      // Clears user state
      fetchUser();
      
      window.location.href = "/";
    } catch (err) {
      return err;
    }
  };

  return (
    <Box component="form" noValidate>
      <Button
        variant="text"
        component="label"
        startIcon={<AccountCircleTwoToneIcon />}
        onClick={handleSignOut}
      >
        Sign Out
      </Button>
    </Box>
  );
}
