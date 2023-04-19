import React from "react";
import Cookies from "universal-cookie";
import { Box, Button } from "@mui/material";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import { toast } from "react-toastify";
import uploadAvatar from "../../utils/uploadAvatar";

export default function UpdateAvatar() {
  const cookies = new Cookies();

  const handleUploadAvatar = async (event) => {
    event.preventDefault();
    const image = event.target.files[0];
    const token = cookies.get("token");

    try {
      const { message } = await uploadAvatar(image, token);

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
        variant="text"
        component="label"
        startIcon={<AccountCircleTwoToneIcon />}
      >
        Upload Avatar
        <input
          hidden
          accept="image/*"
          type="file"
          name="avatar"
          onChange={handleUploadAvatar}
        />
      </Button>
    </Box>
  );
}
