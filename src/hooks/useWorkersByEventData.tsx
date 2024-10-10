import { TypedSupabaseClient } from "@/utils";
import { useQuery } from "@tanstack/react-query";

export const useWorkersByEventData = (
  client: TypedSupabaseClient,
  eventId: number
) => {
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
