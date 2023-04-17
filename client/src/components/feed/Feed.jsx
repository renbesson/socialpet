import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useAuth } from "../../utils/authProvider";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";

export default function Feed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const cookies = new Cookies();

  const getPosts = async () => {
    try {
      const res = await fetch(`/api/post/following/?petId${user._id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const { posts, message } = await res.json();
      setPosts(posts);
    } catch (err) {
      toast(err.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, [user]);

  return (
    <Grid sx={{ mt: 5 }} container spacing={5} justifyContent="center">
      <Grid item xs={10}>
        <Share />
      </Grid>
      {posts?.map((p) => (
        <Grid key={p._id} item xs={10}>
          <Post post={p} />
        </Grid>
      ))}
    </Grid>
  );
}
