import { useState } from "react";
import usePosts from "./hooks/usePosts";

const PostList = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = usePosts({ page, pageSize });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <div className="max-w-xl ">
        {data?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </div>
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-2 ml-2">
        Previous
      </button>
      <button
        disabled={page === 10}
        onClick={() => setPage(page + 1)}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-2 ml-2">
        Next
      </button>
    </>
  );
};

export default PostList;
