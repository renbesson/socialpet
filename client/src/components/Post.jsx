import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../utils/authProvider";
import { Avatar, Card, CardActions } from "@mui/material";
import { CardContent, CardHeader, CardMedia } from "@mui/material";
import { IconButton, Link, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import PetsIcon from '@mui/icons-material/Pets';
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import { useState } from "react";
import UpdatePostButton from "./buttons/UpdatePostButton";
import DeletePostButton from "./buttons/DeletePostButton";

export default function Post({ post }) {
  const { user } = useAuth();
  const [likeCount, setLikeCount] = useState(post.likes);
  const cookies = new Cookies();

  const owner = post.ownerId;

  const likePost = async (id) => {
    try {
      const res = await fetch(`/api/post/like/?postId=${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: cookies.get("token") }),
      });
      const { message } = await res.json();

      if (!res.ok) return toast(`Message: ${message} | Code: ${res.status}`);
      // Code 201 - Like added
      if (res.status === 201) setLikeCount((prev) => prev + 1);

      // Code 200 - Like removed
      if (res.status === 200) setLikeCount((prev) => prev - 1);

      return toast(message);
    } catch (err) {
      toast(err.message);
    }
  };

  return (
    <Card sx={{ boxShadow: 5, maxWidth: 800 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ width: 64, height: 64 }}
            aria-label="avatar"
            src={owner?.avatar ? owner?.avatar : "assets/images/catAvatar.png"}
          ></Avatar>
        }
        title={
          <Typography sx={{ fontWeight: 500 }}>
            <Link
              component={RouterLink}
              to={`/pet/?petId=${post?.ownerId._id}`}
              color={"#000"}
            >
              {post?.ownerId?.name}
            </Link>
          </Typography>
        }
        subheader={`Last updated: ${moment(post.updatedAt).format(
          "MMMM DD, YYYY - h:mm:ss a"
        )}`}
      />
      <CardMedia
        component="img"
        sx={{ objectFit: "fill", maxHeight: 400 }}
        image={post.mediaUrl}
      />
      <CardContent>
        <Typography color="primary">{post.content}</Typography>
      </CardContent>
      <CardActions>
        <Tooltip title="Like" placement="right">
          <IconButton
            aria-label="like"
            color="secondary"
            size="large"
            onClick={() => likePost(post._id)}
          >
            <PetsIcon />
          </IconButton>
        </Tooltip>

        <Typography>
          {likeCount} {likeCount > 1 ? "Likes" : "Like"}
        </Typography>
        {user._id === post.ownerId._id && (
          <>
            <UpdatePostButton postId={post._id} />
            <DeletePostButton postId={post._id} />
          </>
        )}
      </CardActions>
    </Card>
  );
}
