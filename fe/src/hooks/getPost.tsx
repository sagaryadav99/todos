import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
export function useGetPost(token: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axios(`${API_URL}/post`, {
        headers: { Authorization: token, "Content-type": "application/json" },
      });
      return res.data;
    },
  });
  return { data, isLoading, isError };
}
