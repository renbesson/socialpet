import { useRef } from "react";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import uploadAvatar from "../../utils/uploadAvatar";
import toBase64 from "../../utils/toBase64";
import { useAuth } from "../../utils/authProvider";
import { Link } from "react-router-dom";

export default function UpdateAvatarButton() {
  const { fetchPet } = useAuth();
  const imgInput = useRef();

  const handleUploadAvatar = async (event) => {
    event.preventDefault();
    const image = event.target.files[0];

    try {
      // Converts the file to base64
      const fileAsString = await toBase64(image);

      const { message } = await uploadAvatar(fileAsString);

      toast(message);

      await fetchPet();
    } catch (err) {
      toast(err.message);
    }
  };

  return (
    <Box component="form" noValidate>
      <Link onClick={() => imgInput.current.click()}>Update Avatar</Link>
      <input
        hidden
        accept="image/*"
        type="file"
        ref={imgInput}
        name="avatar"
        onChange={handleUploadAvatar}
      />
    </Box>
  );
}
