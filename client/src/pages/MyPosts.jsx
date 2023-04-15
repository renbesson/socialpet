import { useState } from 'react';
import { RequireAuth, useAuth } from '../utils/authProvider';

export default function MyPosts() {
  const auth = useAuth();
  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    const petId = auth.user?._id;

    try {
      const res = await fetch(`/api/pet/${petId}/posts`);
      console.log(res);
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <RequireAuth>
      <h1>MyPosts</h1>
      <p>{JSON.stringify(posts)}</p>
    </RequireAuth>
  );
}
