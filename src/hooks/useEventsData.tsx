import { TypedSupabaseClient } from "@/utils";
import { useQuery } from "@tanstack/react-query";

export const useEventsData = (client: TypedSupabaseClient) => {
  const queryKey = ["events"];

  const queryFn = async () => {
    return await client.from("events").select("*");
  };

  return useQuery({ queryKey, queryFn });
};
