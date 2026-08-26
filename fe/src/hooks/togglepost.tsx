import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
export function useTogglePost() {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      id,
      completed,
    }: {
      id: string;
      completed: boolean;
    }) => {
      await axios.patch(
        `${API_URL}/post/${id}?flag=${completed}`,
        {},
        {
          headers: {
            Authorization: token,
            "Content-type": "application/json",
          },
        },
      );

      return { id, completed };
    },

    onSuccess: ({ id, completed }) => {
      queryClient.setQueryData(["posts"], (oldPosts: any[]) => {
        return oldPosts.map((x) => (x.id === id ? { ...x, completed } : x));
      });
    },
  });

  return mutation;
}
