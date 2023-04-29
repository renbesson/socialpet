import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../utils/authProvider";
import Cookies from "universal-cookie";
import UpdateAvatarButton from "./buttons/UpdateAvatarButton";
import UpdateProfileButton from "./buttons/UpdateProfileButton";
import SignOutButton from "./buttons/SignoutButton";

const pages = [
  { text: "Main Feed", link: "/" },
  { text: "My Posts", link: "/myPosts" },
  { text: "Following", link: "/following" },
  { text: "Followers", link: "/following" },
];

function ResponsiveAppBar() {
  const { user } = useAuth();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const cookies = new Cookies();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const SignOutSettings = () => {
    const items = [
      { text: "Sign In", link: "/signin" },
      { text: "Sign Up", link: "/signup" },
    ];

    return items.map((item) => (
      <MenuItem
        component={RouterLink}
        to={item.link}
        onClick={handleCloseUserMenu}
        key={item.text}
      >
        <Typography textAlign="center">{item.text}</Typography>
      </MenuItem>
    ));
  };

  const SignInSettings = () => {
    return [
      <UpdateAvatarButton key={1} />,
      <UpdateProfileButton key={2} />,
      <SignOutButton key={3} />,
    ];
  };

  return (
    <AppBar
      position="sticky"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", lg: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", lg: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.text}
                  component={RouterLink}
                  to={page.link}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">{page.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <img
              src="/assets/images/socialpet-logo.png"
              sx={{ display: { xs: "none", lg: "flex" } }}
              width={256}
            />
            {/* <PetsOutlinedIcon /> */}
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", lg: "flex" } }}></Box>
          <Box sx={{ flexGrow: 0 }}>
            <Typography variant="p" noWrap sx={{ mr: 2, fontWeight: "500" }}>
              {user?.name}
            </Typography>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="User Avatar"
                  src={
                    user?.avatar ? user.avatar : "/assets/images/catAvatar.png"
                  }
                  sx={{ width: 56, height: 56 }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user ? <SignInSettings /> : <SignOutSettings />}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
