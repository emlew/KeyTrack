import { useMutation } from "@tanstack/react-query";
import { useSupabase } from "./useSupabase";
import { useInvalidateQueries } from "./useInvalidateQueries";
import { useSnackbar } from "./useSnackbar";

export const useUpdateHours = () => {
  const client = useSupabase();
  const mutationKey = ["update_hours"];
  const invalidateQueries = useInvalidateQueries();
  const { addSnackbar } = useSnackbar();

  const mutationFn = async ({
    approve,
    deny,
  }: {
    approve: number[];
    deny: number[];
  }) => {
    return await client.rpc("manage_hours", {
      hours_to_approve: approve,
      hours_to_delete: deny,
    });
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
      addSnackbar("Hours successfully updated");
    },
    onError: () => {
      addSnackbar("Something went wrong.");
    },
  });
};
