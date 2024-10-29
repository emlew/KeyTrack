import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "./useSupabase";

export const useHoursData = (getAllHours = false) => {
  const client = useSupabase();
  const queryKey = getAllHours ? ["hours_all"] : ["hours"];

  const queryFn = async () => {
    if (getAllHours) {
      return await client
        .from("hours")
        .select("*, events(name)")
        .then((res) => res.data);
    }
    const email = (await client.auth.getUser()).data.user?.email ?? "";
    return await client
      .from("hours")
      .select("*, events(name)")
      .eq("email", email)
      .then((res) => res.data);
  };

  return useQuery({ queryKey, queryFn });
};
