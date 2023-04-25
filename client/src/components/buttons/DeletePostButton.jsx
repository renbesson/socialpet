import Button from "@mui/material/Button";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useAuth } from "../../utils/authProvider";

export default function DeletePostButton({ postId }) {
  const { fetchUser } = useAuth();
  const cookies = new Cookies();

  ////////////////////////////////////////////////////////////////////////////////
  //  Deletes the post
  ////////////////////////////////////////////////////////////////////////////////
  const handleDeletePost = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(`/api/post/?postId=${postId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: cookies.get("token"),
        }),
      });

      const { message } = await res.json();

      if (!res.ok) return toast(`Message: ${message} | Code: ${res.status}`);
      if (res.status === 200) {
        toast(message);

        fetchUser();
      }
    } catch (err) {
      toast(err.message);
    }
  };

  return (
    <Button
      variant="outlined"
      startIcon={<DeleteForeverIcon />}
      onClick={handleDeletePost}
      color="error"
    >
      Delete Post
    </Button>
  );
}
