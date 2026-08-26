import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
export function useDeletePost() {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const res = await axios.delete(`${API_URL}/post/${id}`, {
        headers: { Authorization: token, "Content-type": "application/json" },
      });
      return id;
    },
    onSuccess: (id) => {
      queryClient.setQueryData(["posts"], (oldPosts: any) => {
        return oldPosts.filter((x) => x.id != id);
      });
    },
  });
  return mutation;
}
