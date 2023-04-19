import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { RequireAuth, useAuth } from "../utils/authProvider"; ////// Import to provide access to auth, which stores the user data
import Button from "@mui/material/Button";
import UpdateIcon from "@mui/icons-material/Update";
import UpdateProfile from "./updateProfile/Profile";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailIcon from "@mui/icons-material/Mail";
import BadgeIcon from "@mui/icons-material/Badge";
import { green, orange, purple, yellow } from "@mui/material/colors";
import UpdateAvatar from "./UpdateAvatar";
import { Drawer, Toolbar } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

export default function RightBar({ user }) {
  const { user: userData } = useAuth();
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
        display: { xs: "none", lg: "block" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto", mt: 2 }}>
        <Typography sx={{ mb: 1 }} variant="h6" component="div">
          My Profile
        </Typography>

        <List dense={dense}>
          <ListItem>
            <ListItemIcon>
              <BadgeIcon sx={{ color: orange[500] }} />
            </ListItemIcon>
            <ListItemText
              primary={user?.name}
              secondary={secondary ? "Secondary text" : null}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <MailIcon sx={{ color: purple[500] }} />
            </ListItemIcon>
            <ListItemText
              primary={user.email}
              secondary={secondary ? "Secondary text" : null}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LocationOnIcon sx={{ color: green[500] }} />
            </ListItemIcon>
            <ListItemText
              primary={user.location}
              secondary={secondary ? "Secondary text" : null}
            />
          </ListItem>
          <ListItem>
            <UpdateAvatar />
          </ListItem>
          <ListItem
            sx={{ display: userData._id != user._id ? "none" : "block" }}
          >
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => {
                setOpen(true);
              }}
            >
              Update Profile
            </Button>
          </ListItem>
        </List>

        <UpdateProfile open={open} setOpen={setOpen} />
      </Box>
    </Drawer>
  );
}
