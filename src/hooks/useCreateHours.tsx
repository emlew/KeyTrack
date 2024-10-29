import { useMutation } from "@tanstack/react-query";
import { useSupabase } from "./useSupabase";
import { useInvalidateQueries } from "./useInvalidateQueries";
import { HourCreate } from "@/api";

export const useCreateHours = () => {
  const client = useSupabase();
  const mutationKey = ["create_hours"];
  const invalidateQueries = useInvalidateQueries();

  const mutationFn = async (hour: HourCreate) => {
    return await client.from("hours").insert([hour]).select();
  };

  return useMutation({
    mutationKey,
    mutationFn,
    onSuccess: invalidateQueries,
  });
};
