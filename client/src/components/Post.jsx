import { useAuth } from "../utils/authProvider";
import moment from "moment";
import PetsIcon from "@mui/icons-material/Pets";
import { toast } from "react-toastify";
import UpdatePostButton from "./modals/UpdatePostButton";
import DeletePostButton from "./modals/DeletePostButton";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const { user, fetchPet } = useAuth();

  const owner = post.ownerId;

  const likePost = async (id) => {
    try {
      const res = await fetch(`/api/post/like/?postId=${id}`, {
        method: "PUT",
      });
      const { message } = await res.json();

      if (!res.ok) return toast(`Message: ${message} | Code: ${res.status}`);
      await fetchPet();

      return toast(message);
    } catch (err) {
      toast(err.message);
    }
  };

  return (
    <div className="card max-w-3xl glass shadow-md">
      <Link className="flex gap-3 p-2" to={`/pet?petId=${post?.ownerId._id}`}>
        <div className="avatar">
          <div className="w-16 mask mask-squircle">
            <img src={owner?.avatar ? owner?.avatar : "assets/images/catAvatar.png"} />
          </div>
        </div>
        <div className="card-title">
          {post?.ownerId?.name}
          <span className="text-sm font-light">
            Last updated: {moment(post.updatedAt).format("MMMM DD, YYYY - h:mm a")}
          </span>
        </div>
      </Link>
      <figure>
        {post.mediaUrl && (
          <img className=" max-h-fit object-fill" src={post.mediaUrl} alt="selected image" />
        )}
      </figure>
      <div className="card-body">
        <p>{post?.content}</p>
        <div className="card-actions gap-5 items-center">
          <button
            className="btn btn-circle btn-primary flex-col"
            onClick={() => likePost(post._id)}
          >
            <PetsIcon />
            {!!post?.likes && post?.likes}
          </button>

          {user._id === post.ownerId._id && (
            <>
              <UpdatePostButton postId={post._id} />
              <DeletePostButton postId={post._id} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
