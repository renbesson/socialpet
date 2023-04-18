import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function UpdateProfile(props) {
  const { open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update My Profile</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="name"
            type="name"
            id="name"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="newEmail"
            label="Email Address"
            name="newEmail"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="newLocation"
            label="Location"
            type="location"
            id="newLocation"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Update</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
