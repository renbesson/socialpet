import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../utils/authProvider";
import toBase64 from "../../utils/toBase64";
import { ReactComponent as EditIcon } from "../../icons/EditIcon.svg";

export default function UpdatePostButton({ postId }) {
  const { fetchPet } = useAuth();

  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");

  ////////////////////////////////////////////////////////////////////////////////
  // Stores the uploaded image as state
  ////////////////////////////////////////////////////////////////////////////////
  const addImage = async (event) => {
    setImage(event.target.files[0]);
  };

  ////////////////////////////////////////////////////////////////////////////////
  //  Updates the post
  ////////////////////////////////////////////////////////////////////////////////
  const handleUpdatePost = async (event) => {
    event.preventDefault();

    try {
      // Converts the file to base64
      let fileAsString = "";

      if (image) fileAsString = await toBase64(image);

      const res = await fetch(`/api/post/?postId=${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          fileAsString,
        }),
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
    <>
      <input type="checkbox" id="updatepost-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-0 max-w-3xl fixed">
          <h2 className="card-title font-semibold text-2xl text-gray-800 m-5">Update Post</h2>
          <figure>
            {image && (
              <img
                className="max-h-fit object-fill"
                src={URL.createObjectURL(image)}
                alt="selected"
              />
            )}
          </figure>
          <div className="card-body">
            <form className="form-control w-full gap-2" onSubmit={handleUpdatePost}>
              <input
                accept="image/*"
                type="file"
                name="image"
                onChange={addImage}
                className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
              />
              <textarea
                className="textarea textarea-secondary textarea-bordered"
                placeholder="Say something..."
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="flex justify-between mt-3">
                <button type="submit">
                  <label htmlFor="updatepost-modal" className="btn btn-primary">
                    Update
                  </label>
                </button>
                <label htmlFor="updatepost-modal" className="btn btn-outline">
                  Cancel
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
      <label
        className="btn btn-square btn-secondary btn-outline flex-col"
        htmlFor="updatepost-modal"
      >
        <EditIcon />
      </label>
    </>
  );
}
