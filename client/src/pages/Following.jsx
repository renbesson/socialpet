import Post from "../components/Post";
import Share from "../components/Share";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useAuth } from "../utils/authProvider";
import RightBar from "../components/Rightbar";

export default function Feed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const cookies = new Cookies();

  const getPosts = async () => {
    try {
      const res = await fetch("/api/post/following", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: cookies.get("token") }),
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
