import Post from "./Post";
import Share from "./Share";
import { useAuth } from "../utils/authProvider";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import RightBar from "./Rightbar";

export default function Feed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const res = await fetch("/api/post", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
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
      {user && <RightBar user={user} />}
    </>
  );
}
