import { useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import { useAuth } from "../utils/authProvider";
import toBase64 from "../utils/toBase64";

export default function Share() {
  const { user, fetchPet } = useAuth();
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");

  ////////////////////////////////////////////////////////////////////////////////
  // Stores the uploaded image as state
  ////////////////////////////////////////////////////////////////////////////////

  const addImage = async (event) => {
    setImage(event.target.files[0]);
  };

  ////////////////////////////////////////////////////////////////////////////////
  //  Creates the post
  ////////////////////////////////////////////////////////////////////////////////
  const handleShare = async (event) => {
    event.preventDefault();

    try {
      // Converts the file to base64
      let fileAsString = "";

      if (image) fileAsString = await toBase64(image);

      const res = await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: content,
          fileAsString,
        }),
      });

      const { message } = await res.json();

      if (!res.ok) return toast(`Message: ${message} | Code: ${res.status}`);
      if (res.status === 201) {
        // Clear the content textfield and image
        setImage(null);
        setContent("");

        toast("Post Created!");

        await fetchPet();
      }
    } catch (err) {
      toast(err.message);
    }
  };

  return (
    <>
      <input type="checkbox" id="share-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-0 max-w-3xl fixed border-2">
          <div className="flex gap-3 p-2">
            <div className="avatar">
              <div className="w-16 mask mask-squircle">
                <img src="/assets/images/avatar.png" />
              </div>
            </div>
            <div className="card-title">
              {user?.name}
              <span className="text-sm font-light">{moment().format("MMMM DD, YYYY")}</span>
            </div>
          </div>
          <figure>
            {image && (
              <img
                className=" max-h-fit object-fill"
                src={URL.createObjectURL(image)}
                alt="selected image"
              />
            )}
          </figure>
          <div className="card-body">
            <form className="form-control w-full gap-2" onSubmit={handleShare}>
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
                  <label htmlFor="share-modal" className="btn btn-primary">
                    Share
                  </label>
                </button>
                <label htmlFor="share-modal" className="btn btn-outline">
                  Cancel
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="card max-w-3xl glass shadow-md">
      <div className="flex gap-3 p-2">
        <div className="avatar">
          <div className="w-16 mask mask-squircle">
            <img src="/assets/images/avatar.png" />
          </div>
        </div>
        <div className="card-title">
          {user?.name}
          <span className="text-sm font-light">{moment().format("MMMM DD, YYYY")}</span>
        </div>
      </div>
      <figure>
        {image && (
          <img
            className=" max-h-fit object-fill"
            src={URL.createObjectURL(image)}
            alt="selected image"
          />
        )}
      </figure>
      <div className="card-body">
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
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={handleShare}>
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
