import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
  userId: number;
  body: string;
}

interface PageSizeQuery {
  pageSize: number;
}

const usePosts = (query: PageSizeQuery) =>
  useInfiniteQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: ({ pageParam = 1 }) =>
      axios
        .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _start: (pageParam - 1) * query.pageSize,
            _limit: query.pageSize,
          },
        })
        .then((res) => res.data),
    initialPageParam: 1,
    staleTime: 1 * 60 * 1000,
    getNextPageParam: (lastPage, allpages) => {
      return lastPage.length > 0 ? allpages.length + 1 : undefined;
    },
  });

export default usePosts;
