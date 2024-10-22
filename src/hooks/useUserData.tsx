import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "./useSupabase";

export const useUserData = (getAllUsers = false) => {
  const client = useSupabase();
  const queryKey = getAllUsers ? ["users"] : ["user"];

  const queryFn = async () => {
    if (getAllUsers) {
      return await client
        .from("profiles")
        .select("*")
        .then((res) => res.data);
    }
    const email = (await client.auth.getUser()).data.user?.email ?? "";
    return await client
      .from("profiles")
      .select("*")
      .eq("email", email)
      .single()
      .then((res) => res.data);
  };

  return useQuery({ queryKey, queryFn });
};
