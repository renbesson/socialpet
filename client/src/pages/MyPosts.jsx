import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Post from "../components/Post";
import { useAuth } from "../utils/authProvider";

export default function SignedHome() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const res = await fetch("/api/post/myPosts");
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
    <div className="container mx-auto items-center flex flex-col gap-8">
      <h3 className="mt-5 text-5xl font-bold text-secondary self-center">
        My Posts
      </h3>
      {posts?.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}
