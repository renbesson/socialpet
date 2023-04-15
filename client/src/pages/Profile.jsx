import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { RequireAuth, useAuth } from '../utils/authProvider';
import { toast } from 'react-toastify';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    type: '',
    species: '',
    location: '',
  });

  const fetchData = async () => {
    const petId = user?._id;

    if (user) {
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
    const form = new FormData(event.currentTarget);
    try {
      const updatedUser = {
        name: form.get('name'),
        email: form.get('email'),
        password: form.get('password'),
        type: form.get('type'),
        species: form.get('species'),
        location: form.get('location'),
      };
      const res = await updateProfile(updatedUser);
      toast(res.message);
    } catch (err) {
      toast(err.message);
    }
  };

  return (
    <RequireAuth>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <p>{JSON.stringify(userData)}</p>
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
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                name="name"
                label="Name"
                id="name"
                value={userData?.name}
              />
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={userData?.email}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <TextField
                margin="normal"
                fullWidth
                name="type"
                label="Type"
                id="type"
                value={userData?.type}
              />
              <TextField
                margin="normal"
                fullWidth
                name="species"
                label="Species"
                id="species"
                value={userData?.species}
              />
              <TextField
                margin="normal"
                fullWidth
                name="location"
                label="Location"
                id="location"
                value={userData?.location}
              />
              {/* Name, emailadd, pw, type, species, Age,  */}
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sumbit
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to="/signin" variant="body2">
                    {'Already have an account? Sign In'}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </RequireAuth>
  );
}
