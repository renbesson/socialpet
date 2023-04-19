import Post from "../components/Post";
import Share from "../components/Share";

import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useAuth } from "../utils/authProvider";
import Sidebar from "../components/Sidebar";
import Rightbar from "../components/Rightbar";

export default function Feed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const cookies = new Cookies();

  const getPosts = async () => {
    try {
      const res = await fetch("/api/post", {
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
    <Grid sx={{}} container spacing={1} justifyContent="center">
      <Grid item md>
        <Sidebar />
      </Grid>
      <Grid item md={8}>
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
      <Grid item sx={{ display: { xs: "none", md: "block" } }}>
        {user && <Rightbar user={user} />}
      </Grid>
    </Grid>
  );
}
