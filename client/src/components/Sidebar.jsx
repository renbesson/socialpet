import { Link as RouterLink, useLocation } from "react-router-dom";
import { Divider, MenuList, MenuItem, List } from "@mui/material";
import { Box, Drawer, Toolbar } from "@mui/material";
import { ListItemText, ListItemIcon } from "@mui/material";
import ContentPaste from "@mui/icons-material/ContentPaste";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import MessageIcon from "@mui/icons-material/Message";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HomeIcon from "@mui/icons-material/Home";

const pages = [
  { text: " Home", link: "/", icon: <HomeIcon /> },
  // { text: " Main Feed", link: "/", icon: <RssFeedIcon /> },
  { text: " My Posts", link: "/myPosts", icon: <RssFeedIcon /> },
  { text: "Following", link: "/following", icon: <HailOutlinedIcon /> },
  { text: "Followers", link: "/followers", icon: <PeopleAltOutlinedIcon /> },
  { text: "Create Post", link: "/", icon: <AddCircleOutlineIcon /> },
  { text: "Messages", link: "/", icon: <MessageIcon /> },
];

export default function Sidebar() {
  const location = useLocation();

  const setColor = (link) => {
    const path = location.pathname;
    if (path === link) return "primary.main";
    else return "secondary.main";
  };

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
                <ListItemIcon>{page.icon}</ListItemIcon>
                <ListItemText sx={{ color: setColor(page.link) }}>
                  {page.text}
                </ListItemText>
              </MenuItem>
              {/* <Divider /> */}
            </div>
          ))}
        </MenuList>
      </Box>
    </Drawer>
  );
}
