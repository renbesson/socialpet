import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import { useState } from "react";
import { RequireAuth, useAuth } from "../../utils/authProvider"; ////// Import to provide access to auth, which stores the user data
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import UpdateProfile from "../updateProfile/Profile";

export default function RightBar() {
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);
  const { user } = useAuth(); // to grab user data from auth
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { md: 200, lg: 300 },
        display: { xs: "none", md: "block" },
      }}
    >
      <Typography sx={{ mt: 4, mb: 1 }} variant="h6" component="div">
        Profile
      </Typography>

      <List dense={dense}>
        <ListItem>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText
            primary={user.name}
            secondary={secondary ? "Secondary text" : null}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText
            primary={user.email}
            secondary={secondary ? "Secondary text" : null}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText
            primary={user.location}
            secondary={secondary ? "Secondary text" : null}
          />
        </ListItem>
      </List>
      <Button
        variant="contained"
        startIcon={<UpdateIcon />}
        onClick={() => {
          setOpen(true);
        }}
      >
        Update Profile
      </Button>
      <UpdateProfile open={open} setOpen={setOpen} />
    </Box>
  );
}
