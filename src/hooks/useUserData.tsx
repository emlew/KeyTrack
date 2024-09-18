import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "./useSupabase";

export const useUserData = () => {
  const client = useSupabase();
  const queryKey = ["user"];

  const queryFn = async () => {
    return client.auth.getUser().then((res) => res.data.user);
  };

  return useQuery({ queryKey, queryFn });
};
