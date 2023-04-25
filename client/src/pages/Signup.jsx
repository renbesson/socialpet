import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useAuth } from "../utils/authProvider";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

export default function SignUp() {
  let { user, fetchUser } = useAuth();
  let location = useLocation();
  let navigate = useNavigate();
  const cookies = new Cookies();

  let origin = location.state?.from?.pathname || "/";

  ////////////////////////////////////////////////////////////////////////////////
  // Function for signing up
  ////////////////////////////////////////////////////////////////////////////////
  const handleSignup = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const newUser = {
      name: form.get("name"),
      email: form.get("newEmail"),
      password: form.get("newPassword"),
      type: form.get("type"),
      species: form.get("species"),
    };
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const { token, message } = await res.json();

      if (!res.ok) return toast(`Message: ${message} | Code: ${res.status}`);
      if (res.status === 201) {
        // Saves token as browser cookie
        cookies.set("token", token, { maxAge: process.env.MAX_AGE });

        fetchUser();

        toast("Pet Created Successfully!");

        // Sends the user back to original page they were
        navigate(origin, { replace: true });
      }
    } catch (err) {
      toast(err.message);
    }
  };

  return !user ? (
    <Grid container component="main" sx={{ height: "calc(100vh - 64px)" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(/assets/images/signup.jpg)",
          backgroundRepeat: "no-repeat",
          // backgroundAttachment: "fixed",
          backgroundColor: (t) =>
            t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
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
            Sign Up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSignup} sx={{ mt: 1 }}>
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
              name="newPassword"
              label="Password"
              type="password"
              id="newPassword"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="type"
              label="type"
              type="type"
              id="type"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="species"
              label="species"
              type="species"
              id="species"
            />
            {/* Name, emailadd, pw, type, species, Age,  */}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/signin" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  ) : (
    <h1>Already signed up/in!</h1>
  );
}
