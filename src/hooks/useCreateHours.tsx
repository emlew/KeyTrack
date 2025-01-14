import { useMutation } from "@tanstack/react-query";
import { useSupabase } from "./useSupabase";
import { useInvalidateQueries } from "./useInvalidateQueries";
import { HourCreate } from "@/api";
import { useSnackbar } from "./useSnackbar";

export const useCreateHours = () => {
  const client = useSupabase();
  const mutationKey = ["create_hours"];
  const invalidateQueries = useInvalidateQueries();
  const { addSnackbar } = useSnackbar();

  const mutationFn = async (hour: HourCreate) => {
    return await client.from("hours").insert([hour]).select();
  };

  return useMutation({
    mutationKey,
    mutationFn,
    onSuccess: (r) => {
      invalidateQueries();
      if (r.error) {
        addSnackbar("Something went wrong.");
        return;
      }
      addSnackbar("Hours successfully logged");
    },
    onError: () => {
      addSnackbar("Something went wrong.");
    },
  });
};
