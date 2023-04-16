import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { RequireAuth, useAuth } from "../utils/authProvider";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import decode from "jwt-decode";

export default function Profile() {
  const { user, setUser } = useAuth();
  const cookies = new Cookies();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    type: "",
    species: "",
    location: "",
  });

  const fetchData = async () => {
    if (user) {
      const petId = user._id;

      try {
        const res = await fetch(`/api/pet/?petId=${petId}`);
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error(err);
      }
    }
  };
  /* eslint-disable */
  useEffect(() => {
    fetchData();
  }, [user]);
  /* eslint-enable */

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

      if (res.status === 406)
        return toast("Password must be at least 8 characters!");
      if (!res.ok) return toast(`Message: ${message}\nCode: ${res.status}`);
      if (res.status === 201) {
        // Saves token as browser cookie
        const { data: user } = decode(token);
        cookies.set("token", token, { maxAge: process.env.MAX_AGE });

        // Saves user state
        setUser(user);

        toast("Profile Updated!");
      }

      return { user, message, code };
    } catch (err) {
      toast(err.message);
    }
  };

  return (
    <RequireAuth>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Profile
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleUpdateProfile}
              sx={{ mt: 1 }}
              autoComplete="off"
            >
              <TextField
                margin="normal"
                fullWidth
                name="name"
                label="Name"
                id="name"
                value={userData?.name}
                onChange={(event) => {
                  setUserData((prev) => ({
                    ...prev,
                    name: event.target.value,
                  }));
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={userData?.email}
                onChange={(event) => {
                  setUserData((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }));
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(event) => {
                  setUserData((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }));
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                name="type"
                label="Type"
                id="type"
                value={userData?.type}
                onChange={(event) => {
                  setUserData((prev) => ({
                    ...prev,
                    type: event.target.value,
                  }));
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                name="species"
                label="Species"
                id="species"
                value={userData?.species}
                onChange={(event) => {
                  setUserData((prev) => ({
                    ...prev,
                    species: event.target.value,
                  }));
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                name="location"
                label="Location"
                id="location"
                value={userData?.location}
                onChange={(event) => {
                  setUserData((prev) => ({
                    ...prev,
                    location: event.target.value,
                  }));
                }}
              />
              {/* Name, emailadd, pw, type, species, Age,  */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sumbit
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </RequireAuth>
  );
}
