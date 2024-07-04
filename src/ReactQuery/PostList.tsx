import { Fragment } from "react";
import usePosts from "./hooks/usePosts";

const PostList = () => {
  const pageSize = 10;
  const { data, error, isLoading, fetchNextPage, isFetchingNextPage } =
    usePosts({ pageSize });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <div className="max-w-xl ">
        {data?.pages.map((page, index) => (
          <Fragment key={index}>
            {page.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </Fragment>
        ))}
      </div>
      <button
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-2 ml-2">
        {isFetchingNextPage ? "Loading..." : "Load More"}
      </button>
    </>
  );
};

export default PostList;
