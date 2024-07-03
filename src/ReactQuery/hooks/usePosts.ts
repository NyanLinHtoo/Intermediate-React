import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
  userId: number;
  body: string;
}

interface PageSizeQuery {
  page: number;
  pageSize: number;
}

const usePosts = (query: PageSizeQuery) => {
  return useQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: () =>
      axios
        .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _start: (query.page - 1) * query.pageSize,
            _limit: query.pageSize,
          },
        })
        .then((res) => res.data),
    staleTime: 1 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
};

export default usePosts;
