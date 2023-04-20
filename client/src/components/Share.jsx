// import { PermMedia } from "@mui/icons-material";
import { useState } from "react";
import { RequireAuth, useAuth } from "../utils/authProvider";
import { Avatar, Box, Button, Card, CardActions } from "@mui/material";
import { CardContent, CardHeader, CardMedia, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import moment from "moment";
import toBase64 from "../utils/toBase64";

export default function Share() {
  const { user } = useAuth();
  const cookies = new Cookies();
  const [image, setImage] = useState(null);

  ////////////////////////////////////////////////////////////////////////////////
  // Stores the uploaded image as state
  ////////////////////////////////////////////////////////////////////////////////

  const addImage = async (event) => {
    setImage(event.target.files[0]);
  };

  ////////////////////////////////////////////////////////////////////////////////
  //  Creates the post
  ////////////////////////////////////////////////////////////////////////////////
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      // Converts the file to base64
      let fileAsString = "";

      if (image) fileAsString = await toBase64(image);
      else console.log("dasd");

      const res = await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: cookies.get("token"),
          content: formData.get("content"),
          fileAsString,
        }),
      });
      const { message } = await res.json();

      if (!res.ok) return toast(`Message: ${message} | Code: ${res.status}`);
      if (res.status === 201) {
        // Clear the content textfield
        formData.set("content", "");

        toast("Post Created!");

        toast(message);
      }
    } catch (err) {
      toast(err.message);
    }
  };

  return (
    <RequireAuth>
      <Card sx={{ boxShadow: 5, maxWidth: 800 }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ width: 64, height: 64 }}
              aria-label="avatar"
              src={user?.avatar ? user.avatar : "assets/images/catAvatar.png"}
            ></Avatar>
          }
          title={<Typography sx={{ fontWeight: 500 }}>{user?.name}</Typography>}
          subheader={moment().format("MMMM DD, YYYY")}
        />
        <CardMedia
          component="img"
          sx={{ objectFit: "fill", maxHeight: 400 }}
          image={image ? URL.createObjectURL(image) : ""}
        />
        <CardContent>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Button
              variant="contained"
              component="label"
              endIcon={<CloudUploadIcon />}
            >
              Upload Image
              <input
                hidden
                accept="image/*"
                type="file"
                name="image"
                onChange={addImage}
              />
            </Button>
            <TextField
              margin="normal"
              required
              fullWidth
              multiline
              minRows={5}
              name="content"
              label="Say something..."
              id="content"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Share
            </Button>
          </Box>
        </CardContent>
        <CardActions disableSpacing></CardActions>
      </Card>
    </RequireAuth>
  );
}
