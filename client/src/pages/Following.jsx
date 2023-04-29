import Post from "../components/Post";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Grid, Stack } from "@mui/material";
import { toast } from "react-toastify";
import { RequireAuth, useAuth } from "../utils/authProvider";
import Rightbar from "../components/Rightbar";
import Sidebar from "../components/Sidebar";
import Typography from "../components/modules/Typography";

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
      <Stack direction="row" justifyContent="center" sx={{ mt: 5 }}>
        <Typography variant="h3" color="primary">
          Following
        </Typography>
      </Stack>
      <Grid container spacing={1} justifyContent="center">
        <Sidebar />

        <Grid item md>
          <Grid sx={{ mt: 5 }} container spacing={5} justifyContent="center">
            <Grid item xs={10}>
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
