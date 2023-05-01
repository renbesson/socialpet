import { toast } from "react-toastify";
import { useAuth } from "../../utils/authProvider";
import { ReactComponent as DeleteIcon } from "../../icons/DeleteIcon.svg";

export default function DeletePostButton({ postId }) {
  const { fetchPet } = useAuth();

  ////////////////////////////////////////////////////////////////////////////////
  //  Deletes the post
  ////////////////////////////////////////////////////////////////////////////////
  const handleDeletePost = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(`/api/post/?postId=${postId}`, {
        method: "DELETE",
      });

      const { message } = await res.json();

      if (!res.ok) return toast(`Message: ${message} | Code: ${res.status}`);
      if (res.status === 200) {
        toast(message);

        await fetchPet();
      }
    } catch (err) {
      toast(err.message);
    }
  };
  return (
    <label className="btn btn-square btn-secondary btn-outline flex-col" onClick={handleDeletePost}>
      <DeleteIcon />
    </label>
  );
}
