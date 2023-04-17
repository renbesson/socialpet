import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Link as RouterLink } from "react-router-dom";
import ContentPaste from "@mui/icons-material/ContentPaste";
import { Box } from "@mui/material";

const pages = [
  { text: "Posts", link: "/myPosts" },
  { text: "Following", link: "/following" },
  { text: "Followers", link: "/following" },
];

export default function IconMenu() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { md: 200, lg: 300 },
        display: { xs: "none", md: "block" },
      }}
    >
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
  );
}
