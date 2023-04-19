import { Link as RouterLink } from "react-router-dom";

import { Divider, MenuList, MenuItem, List } from "@mui/material";
import { Avatar, ListItemButton, ListItemAvatar } from "@mui/material";
import { Box, Drawer, Toolbar } from "@mui/material";
import { ListItem, ListItemText, ListItemIcon } from "@mui/material";
import ContentPaste from "@mui/icons-material/ContentPaste";

const pages = [
  { text: " My Posts", link: "/myPosts" },
  { text: "Following", link: "/following" },
  { text: "Followers", link: "/followers" },
];

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
        display: { xs: "none", lg: "block" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto", mt: 2 }}>
        <MenuList>
          {pages.map((page) => (
            <div key={page.text}>
              <MenuItem component={RouterLink} to={page.link}>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>{page.text}</ListItemText>
              </MenuItem>
              <Divider />
            </div>
          ))}
        </MenuList>
      </Box>
    </Drawer>
  );
}
