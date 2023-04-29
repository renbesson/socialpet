import React from "react";
import Cookies from "universal-cookie";
import { Box, Button } from "@mui/material";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import { toast } from "react-toastify";
import uploadAvatar from "../../utils/uploadAvatar";
import toBase64 from "../../utils/toBase64";
import { useAuth } from "../../utils/authProvider";

export default function UpdateAvatarButton() {
  const { fetchPet } = useAuth();
  const cookies = new Cookies();

  const handleUploadAvatar = async (event) => {
    event.preventDefault();
    const image = event.target.files[0];
    const token = cookies.get("token");

    try {
      // Converts the file to base64
      const fileAsString = await toBase64(image);

      const { message } = await uploadAvatar(fileAsString, token);

      toast(message);

      fetchPet();
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
