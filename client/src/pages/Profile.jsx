import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { RequireAuth, useAuth } from '../utils/authProvider';
import { toast } from 'react-toastify';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    type: '',
    species: '',
    location: '',
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

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await updateProfile(userData);
      window.location.reload();
      toast(res.message);
    } catch (err) {
      toast(err.message);
    }
  };

  return (
    <RequireAuth>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Profile
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
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
                  setUserData((prev) => ({ ...prev, name: event.target.value }));
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
                  setUserData((prev) => ({ ...prev, email: event.target.value }));
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
                  setUserData((prev) => ({ ...prev, password: event.target.value }));
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
                  setUserData((prev) => ({ ...prev, type: event.target.value }));
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
                  setUserData((prev) => ({ ...prev, species: event.target.value }));
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
                  setUserData((prev) => ({ ...prev, location: event.target.value }));
                }}
              />
              {/* Name, emailadd, pw, type, species, Age,  */}
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sumbit
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </RequireAuth>
  );
}