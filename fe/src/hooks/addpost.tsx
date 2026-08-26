import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
export function useAddPost() {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({
      title,
      description,
    }: {
      title: string;
      description: string;
    }) => {
      const res = await axios.post(
        `${API_URL}/post`,
        {
          title: title,
          description: description,
        },
        {
          headers: { Authorization: token, "Content-type": "application/json" },
        },
      );
      return res.data.post;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["posts"], (oldPosts: any[]) => {
        return [...oldPosts, data];
      });
    },
  });
  return mutation;
}
