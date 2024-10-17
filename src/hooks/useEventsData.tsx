import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "./useSupabase";

export const useEventsData = () => {
  const client = useSupabase();
  const queryKey = ["events"];

  const queryFn = async () => {
    return await client.from("events").select("*, shifts(*), workers(*)");
  };

  return useQuery({ queryKey, queryFn });
};
