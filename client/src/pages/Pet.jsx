import Post from "../components/Post";
import Share from "../components/Share";

import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { RequireAuth, useAuth } from "../utils/authProvider";
import Rightbar from "../components/Rightbar";
import { useSearchParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Feed() {
  const { user } = useAuth();
  const [pet, setPet] = useState([]);
  const [posts, setPosts] = useState([]);
  const cookies = new Cookies();
  const [searchParams] = useSearchParams();
  const petId = searchParams.get("petId");

  const getPosts = async () => {
    try {
      const res = await fetch(`/api/post/pet/?petId=${petId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: cookies.get("token") }),
      });
      const { pet, posts } = await res.json();

      setPet(pet);
      setPosts(posts);
    } catch (err) {
      toast(err.message);
    }
  };

  /* eslint-disable */
  useEffect(() => {
    getPosts();
  }, [user]);
  /* eslint-enable */

  const toggleFollowPet = async () => {
    try {
      const res = await fetch(`/api/pet/follow/?petId=${petId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: cookies.get("token") }),
      });
      const { message } = await res.json();

      toast(message);

      // Reloads the page to get the new post
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      toast(err.message);
    }
  };
  const isFollowing = user?.following.includes(pet?._id);

  return (
    <RequireAuth>
      <Grid sx={{mt: 5}} container spacing={1} justifyContent="space-evenly">
        <Grid item>
          <Typography variant="h3">
            <Typography variant="span" color="primary">
              {`${pet?.name}'s `}
            </Typography>
            Profile
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="primary" onClick={toggleFollowPet}>
            {!isFollowing ? "Follow" : "Unfollow"}
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={1} justifyContent="center">
        <Sidebar />

        <Grid item md>
          <Grid sx={{ mt: 1 }} container spacing={5} justifyContent="center">
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

        {user && <Rightbar user={pet} />}
      </Grid>
    </RequireAuth>
  );
}
