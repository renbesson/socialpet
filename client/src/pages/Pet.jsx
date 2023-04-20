import Post from "../components/Post";
import Share from "../components/Share";

import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useAuth } from "../utils/authProvider";
import RightBar from "../components/Rightbar";
import { useSearchParams } from "react-router-dom";

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
    <>
      <Grid sx={{ mt: 1 }} container spacing={5} justifyContent="center">
        <Grid item xs={12}>
          <Stack
            sx={{ maxWidth: 800 }}
            direction="row"
            justifyContent="space-around"
            alignItems="flex-start"
          >
            <Typography variant="h3">
              <Typography variant="span" color="primary">
                {`${pet?.name}'s `}
              </Typography>
              Profile
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={toggleFollowPet}
            >
              {!isFollowing ? "Follow" : "Unfollow"}
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={10}>
          {petId === user?._id && <Share />}
        </Grid>
        {posts?.map((post) => (
          <Grid key={post._id} item xs={10}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
      {user && <RightBar user={pet} />}
    </>
  );
}
