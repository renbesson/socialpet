import Post from "../components/Post";
import Share from "../components/Share";

import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Grid } from "@mui/material";
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

  const getPosts = async () => {
    try {
      const petId = searchParams.get("petId");

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

  useEffect(() => {
    getPosts();
  }, [user]);

  return (
    <>
      <Grid sx={{ mt: 1 }} container spacing={5} justifyContent="center">
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
