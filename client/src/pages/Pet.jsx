import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../utils/authProvider";
import Post from "../components/Post";

export default function Feed() {
  const { user, fetchPet } = useAuth();
  const [pet, setPet] = useState([]);
  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const petId = searchParams.get("petId");

  const getPosts = async () => {
    try {
      const res = await fetch(`/api/post/pet/?petId=${petId}`);
      const { pet, posts } = await res.json();

      setPet(pet);
      setPosts(posts);
    } catch (err) {
      toast(err.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, [user]);

  const toggleFollowPet = async () => {
    try {
      const res = await fetch(`/api/pet/follow/?petId=${petId}`, {
        method: "PUT",
      });
      const { message } = await res.json();

      toast(message);

      await fetchPet();
    } catch (err) {
      toast(err.message);
    }
  };
  const isFollowing = user?.following.includes(pet?._id);

  return (
    <div className="container mx-auto items-center flex flex-col gap-8">
      <h3 className="mt-5 text-5xl font-bold text-secondary self-center">{pet?.name}'s Profile</h3>
      <button className="btn btn-primary w-32" onClick={toggleFollowPet}>
        {!isFollowing ? "Follow" : "Unfollow"}
      </button>
      {posts?.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}
