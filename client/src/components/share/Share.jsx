// import { PermMedia } from "@mui/icons-material";
import "./share.css";
import FileUpload from "../FileUploader";
import { useState } from "react";
import { RequireAuth, useAuth } from "../../utils/authProvider";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import decode from "jwt-decode";

export default function Share() {
  const [files, setfiles] = useState([""]);
  const { user } = useAuth();
  const cookies = new Cookies();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("test");
    const form = new FormData(event.currentTarget);
    const newPost = { content: form.get("content") };
    try {
      const res = await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: cookies.get("token"), ...newPost }),
      });
      const { post, message } = await res.json();

      if (!res.ok)
        return toast(
          <div>
            <b>Message:</b> {message}
            <br />
            <b>Code:</b> {res.status}
          </div>
        );
      if (res.status === 201) {
        // Clear the content textfield
        form.set("content", "");

        toast(
          <div>
            <b>Post Created!</b>
          </div>
        );

        // Reloads the page to get the new post
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (err) {
      toast(err.message);
    }
  };

  return (
    <RequireAuth>
      <Card sx={{ boxShadow: 5 }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ width: 64, height: 64 }}
              aria-label="avatar"
              src={user?.avatar ? user.avatar : "assets/images/catAvatar.png"}
            ></Avatar>
          }
          title={<Typography sx={{ fontWeight: 500 }}>{user?.name}</Typography>}
          subheader="September 14, 2016"
        />
        <CardContent>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
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
