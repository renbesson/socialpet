import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailIcon from "@mui/icons-material/Mail";
import BadgeIcon from "@mui/icons-material/Badge";
import { green, orange, purple } from "@mui/material/colors";
import { Drawer, Toolbar } from "@mui/material";

export default function RightBar({ user }) {
  const [dense] = useState(false);
  const [secondary] = useState(false);

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
        <List dense={dense}>
          <ListItem>
            <Typography sx={{ mb: 1 }} variant="h6" component="div">
              User Profile
            </Typography>
          </ListItem>
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
        </List>
      </Box>
    </Drawer>
  );
}
