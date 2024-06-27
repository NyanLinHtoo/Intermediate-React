import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

interface Todo {
  id: number;
  title: string;
}

const TodoList = () => {
  const fetchTodos = () =>
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.data);
  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  return (
    <div>
      {/* {errors} */}
      {todos?.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </div>
  );
};

export default TodoList;
