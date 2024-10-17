import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "./useSupabase";

export const useShiftsData = (eventId: number) => {
  const client = useSupabase();
  const queryKey = ["shifts"];

  const queryFn = async () => {
    const { data, error } = await client
      .from("events")
      .select("*, shifts(*), workers(*)")
      .eq("id", eventId)
      .eq("shifts.event_id", eventId)
      .eq("workers.event_id", eventId)
      .single();
    if (error) {
      console.log(error);
    }
    return await data;
  };

  return useQuery({ queryKey, queryFn });
};
