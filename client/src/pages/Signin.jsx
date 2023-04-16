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
import decode from "jwt-decode";

export default function Login() {
  let { user, setUser } = useAuth();
  const cookies = new Cookies();
  let location = useLocation();
  let navigate = useNavigate();

  let origin = location.state?.from?.pathname || "/";

  ////////////////////////////////////////////////////////////////////////////////
  // Function for signing in
  ////////////////////////////////////////////////////////////////////////////////
  const handleSignin = async (event) => {
    event.preventDefault();

    try {
      const form = new FormData(event.currentTarget);

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
      });
      const { token, message } = await res.json();

      if (res.status === 404) return toast("Wrong Email!");
      if (res.status === 401) return toast("Wrong Password!");
      if (!res.ok) return toast(`Message: ${message}\nCode: ${res.status}`);
      if (res.status === 200) {
        // Saves token as browser cookie
        const { data: user } = decode(token);
        cookies.set("token", token, { maxAge: process.env.MAX_AGE });

        // Saves user state
        setUser(user);

        toast(`Welcome back, ${user.name}!`);

        // Sends the user back to original page they were
        navigate(origin, { replace: true });
      }
    } catch (err) {
      toast(err.message);
    }
  };

  return !user ? (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1517105274840-437212774105?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTU4fHxwZXRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60)",
          backgroundRepeat: "no-repeat",
          // backgroundAttachment: "fixed",
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
            Sign In
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSignin}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  ) : (
    <h1>Already Signed In!</h1>
  );
}
