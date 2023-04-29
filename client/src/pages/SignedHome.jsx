import Post from "../components/Post";
import Share from "../components/Share";
import { useEffect, useState } from "react";
import { Grid, Stack } from "@mui/material";
import { toast } from "react-toastify";
import { RequireAuth, useAuth } from "../utils/authProvider";
import Sidebar from "../components/Sidebar";
import Rightbar from "../components/Rightbar";
import Typography from "../components/modules/Typography";

export default function SignedHome() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const res = await fetch("/api/post");
      const { posts } = await res.json();
      setPosts(posts);
    } catch (err) {
      toast(err.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, [user]);

  return (
    <>
      <Stack direction="row" justifyContent="center" sx={{ mt: 5 }}>
        <Typography variant="h3" color="primary">
          Main Feed
        </Typography>
      </Stack>
      <Grid container spacing={1} justifyContent="center">
        <Sidebar />

        <Grid item md>
          <Grid sx={{ mt: 5 }} container spacing={5} justifyContent="center">
            <Grid item xs={10}>
              <Share />
            </Grid>
            {posts?.map((post) => (
              <Grid key={post._id} item xs={10}>
                <Post post={post} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {user && <Rightbar user={user} />}
      </Grid>
    </>
  );
}
