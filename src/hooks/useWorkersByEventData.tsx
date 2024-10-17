import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "./useSupabase";

export const useWorkersByEventData = (eventId: number) => {
  const client = useSupabase();
  const queryKey = ["workers_event"];

  const queryFn = async () => {
    const { data, error } = await client.rpc("get_workers_by_event", {
      event: eventId,
    });
    if (error) {
      console.log(error);
    }
    return await data;
  };

  return useQuery({ queryKey, queryFn });
};
