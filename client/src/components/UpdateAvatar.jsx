import React from "react";
import Cookies from "universal-cookie";
import toBase64 from "../utils/toBase64";
import { Box, Button } from "@mui/material";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import { useAuth } from "../utils/authProvider";
import { toast } from "react-toastify";

export default function UpdateAvatar() {
  const { user, setUser } = useAuth();

  const cookies = new Cookies();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const image = event.target.files[0];

    try {
      // Converts the file to base64
      const fileAsString = await toBase64(image);

      const res = await fetch(`/api/pet/avatar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: cookies.get("token"), fileAsString }),
      });
      const { url, message } = await res.json();

      if (!res.ok)
        return toast(
          <div>
            <b>Message:</b> {message}
            <br />
            <b>Code:</b> {res.status}
          </div>
        );

      toast(message);

      // Reloads the page to get the new post
      setTimeout(() => window.location.reload(), 1000);

    } catch (err) {
      toast(err.message);
    }
  };

  return (
    <Box component="form" noValidate>
      <Button
        variant="contained"
        component="label"
        startIcon={<AccountCircleTwoToneIcon />}
      >
        Upload Avatar
        <input
          hidden
          accept="image/*"
          type="file"
          name="avatar"
          onChange={handleSubmit}
        />
      </Button>
    </Box>
  );
}
