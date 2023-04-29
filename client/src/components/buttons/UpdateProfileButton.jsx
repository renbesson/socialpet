import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { useAuth } from "../../utils/authProvider";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import decode from "jwt-decode";

export default function UpdateProfileButton() {
  const { user, fetchPet } = useAuth();
  const [open, setOpen] = useState(false);
  const cookies = new Cookies();
  const [userData, setUserData] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  ////////////////////////////////////////////////////////////////////////////////
  // Function for updating profile
  ////////////////////////////////////////////////////////////////////////////////
  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(`/api/auth/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          petId: user?._id,
          data: userData,
          token: cookies.get("token"),
        }),
      });
      const { token, message, code } = await res.json();

      if (res.status === 406) return toast("Password must be at least 8 characters!");
      if (!res.ok) return toast(`Message: ${message} | Code: ${res.status}`);
      if (res.status === 201) {
        // Saves token as browser cookie
        cookies.set("token", token, { maxAge: process.env.MAX_AGE });

        fetchPet();

        toast("Profile Updated!");
      }

      return { user, message, code };
    } catch (err) {
      toast(err.message);
    }
  };

  const updateField = (event) => {
    setUserData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const stopPropagationForTab = (event) => {
    if (event.key === "Tab") {
      event.stopPropagation();
    }
  };

  return (
    <>
      <Dialog onKeyDown={stopPropagationForTab} open={open} onClose={handleClose}>
        <DialogTitle>Update My Profile</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="Name"
            type="name"
            id="name"
            defaultValue={user?.name}
            onChange={updateField}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            defaultValue={user?.email}
            onChange={updateField}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="type"
            label="Type"
            type="type"
            id="type"
            defaultValue={user?.type}
            onChange={updateField}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="species"
            label="Species"
            type="species"
            id="species"
            defaultValue={user?.species}
            onChange={updateField}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="location"
            label="Location"
            type="location"
            id="location"
            defaultValue={user?.location}
            onChange={updateField}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateProfile}>Update</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Button
        variant="text"
        startIcon={<EditIcon />}
        onClick={() => {
          setOpen(true);
        }}
      >
        Update Profile
      </Button>
    </>
  );
}
