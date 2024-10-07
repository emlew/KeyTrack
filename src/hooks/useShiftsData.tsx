import { TypedSupabaseClient } from "@/utils";
import { useQuery } from "@tanstack/react-query";

export const useShiftsData = (client: TypedSupabaseClient, eventId: number) => {
  const queryKey = ["shifts"];

  const queryFn = async () => {
    const { data, error } = await client
      .from("events")
      .select("*, shifts(*)")
      .eq("id", eventId)
      .eq("shifts.event_id", eventId)
      .single();
    if (error) {
      console.log(error);
    }
    return await data;
  };

  return useQuery({ queryKey, queryFn });
};
