import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { useAuth } from "../../utils/authProvider";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import { Avatar, Box } from "@mui/material";
import { CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import toBase64 from "../../utils/toBase64";

export default function UpdatePostButton({ postId }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const cookies = new Cookies();

  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const stopPropagationForTab = (event) => {
    if (event.key === "Tab") {
      event.stopPropagation();
    }
  };

  ////////////////////////////////////////////////////////////////////////////////
  // Stores the uploaded image as state
  ////////////////////////////////////////////////////////////////////////////////

  const addImage = async (event) => {
    setImage(event.target.files[0]);
  };

  ////////////////////////////////////////////////////////////////////////////////
  //  Updates the post
  ////////////////////////////////////////////////////////////////////////////////
  const handleUpdatePost = async (event) => {
    event.preventDefault();

    try {
      // Converts the file to base64
      let fileAsString = "";

      if (image) fileAsString = await toBase64(image);

      const res = await fetch(`/api/post/?postId=${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: cookies.get("token"),
          content,
          fileAsString,
        }),
      });

      const { message } = await res.json();

      if (!res.ok) return toast(`Message: ${message} | Code: ${res.status}`);
      if (res.status === 200) {
        toast(message);

        // Reloads the page to get the new post
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (err) {
      toast(err.message);
    }
  };

  return (
    <>
      <Dialog
        onKeyDown={stopPropagationForTab}
        open={open}
        onClose={handleClose}
        fullWidth
      >
        <DialogTitle>Update Post</DialogTitle>
        <DialogContent>
          <CardHeader
            avatar={
              <Avatar
                sx={{ width: 64, height: 64 }}
                aria-label="avatar"
                src={user?.avatar ? user.avatar : "assets/images/catAvatar.png"}
              ></Avatar>
            }
            title={
              <Typography sx={{ fontWeight: 500 }}>{user?.name}</Typography>
            }
          />
          <CardMedia
            component="img"
            sx={{ objectFit: "fill", maxHeight: 400 }}
            image={image ? URL.createObjectURL(image) : ""}
          />
          <CardContent>
            <Box component="form" noValidate sx={{ mt: 1 }}>
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
                onChange={(event) => setContent(event.target.value)}
              />
            </Box>
          </CardContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdatePost}>Update</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Button
        variant="outlined"
        startIcon={<EditIcon />}
        onClick={() => {
          setOpen(true);
        }}
      >
        Update Post
      </Button>
    </>
  );
}
