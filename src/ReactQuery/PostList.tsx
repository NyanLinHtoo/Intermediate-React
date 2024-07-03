import usePosts from "./hooks/usePosts";

const PostList = () => {
  const { data: posts, error, isLoading } = usePosts();

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <div>
      {posts?.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </div>
  );
};

export default PostList;
