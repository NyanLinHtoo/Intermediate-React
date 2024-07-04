import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef } from "react";
import { Todo } from "./hooks/useTodos";

const TodoForm = () => {
  const queryClient = useQueryClient();

  const addTodo = useMutation({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data),
    onSuccess: (savedTodo, newTodo) => {
      console.log(savedTodo);

      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        savedTodo,
        ...(todos || []),
      ]);
    },
  });

  const ref = useRef<HTMLInputElement>(null);
  return (
    <form
      className="flex"
      onSubmit={(e) => {
        e.preventDefault();
        if (ref.current && ref.current.value) {
          addTodo.mutate({
            id: 0,
            title: ref.current?.value,
            completed: false,
            userId: 1,
          });
        }
      }}>
      <div>
        <input
          ref={ref}
          type="text"
          className="bg-gray-50 border my-2 border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
        />
      </div>
      <div>
        <button className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-2 ml-2">
          Add
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
