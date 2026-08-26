import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
export function useUpdatePost() {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      id,
      title,
      description,
    }: {
      id: string;
      title: string;
      description: string;
    }) => {
      const res = await axios.put(
        `${API_URL}/post/${id}`,
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        },
      );

      return res.data;
    },

    onSuccess: (updatedPost) => {
      queryClient.setQueryData(["posts"], (oldPosts: any[]) => {
        return oldPosts.map((x) => (x.id === updatedPost.id ? updatedPost : x));
      });
    },
  });
  return mutation;
}
