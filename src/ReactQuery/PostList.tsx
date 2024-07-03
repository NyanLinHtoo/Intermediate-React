import { useState } from "react";
import usePosts from "./hooks/usePosts";

const PostList = () => {
  const [userId, setUserId] = useState<number>();
  const { data: posts, error, isLoading } = usePosts(userId);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <div className="max-w-xl ">
      <select
        onChange={(event) => setUserId(parseInt(event.target.value))}
        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg">
        <option selected></option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>
      {posts?.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </div>
  );
};

export default PostList;
