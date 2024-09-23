import { useQuery } from "@tanstack/react-query";
import { useAdminSupabase } from "./useAdminSupabase";

export const useAllUsersData = () => {
  const client = useAdminSupabase();
  const queryKey = ["users"];

  const queryFn = async () => {
    return client.listUsers().then((res) => res.data);
  };

  return useQuery({ queryKey, queryFn });
};
