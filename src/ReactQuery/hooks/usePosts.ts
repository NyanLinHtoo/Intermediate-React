import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
  userId: number;
  body: string;
}

const usePosts = (userId: number) => {
  return useQuery<Post[], Error>({
    queryKey: userId ? ["user", userId, "posts"] : ["posts"],
    queryFn: () =>
      axios
        .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
          params: {
            userId,
          },
        })
        .then((res) => res.data),
    staleTime: 1 * 60 * 1000,
  });
};

export default usePosts;
