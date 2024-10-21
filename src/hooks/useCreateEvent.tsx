import { useMutation } from "@tanstack/react-query";
import { useSupabase } from "./useSupabase";
import { useInvalidateQueries } from "./useInvalidateQueries";
import { EventCreate } from "@/api";

export const useCreateEvent = () => {
  const client = useSupabase();
  const mutationKey = ["create_event"];
  const invalidateQueries = useInvalidateQueries();

  const mutationFn = async (event: EventCreate) => {
    return await client.from("events").insert([event]).select();

  };

  return useMutation({
    mutationKey,
    mutationFn,
    onSuccess: invalidateQueries,
  });
};
