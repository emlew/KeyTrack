import { useMutation } from "@tanstack/react-query";
import { useSupabase } from "./useSupabase";
import { useInvalidateQueries } from "./useInvalidateQueries";
import { useSnackbar } from "./useSnackbar";

export const useSyncWorkers = (prevWorkers: number[], newWorkers: number[]) => {
  const client = useSupabase();
  const mutationKey = ["sync_workers"];
  const invalidateQueries = useInvalidateQueries();
  const { addSnackbar } = useSnackbar();

  const mutationFn = async () => {
    return await client.rpc("manage_workers_by_shifts", {
      shifts_to_add: newWorkers,
      shifts_to_delete: prevWorkers,
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
      addSnackbar("Signup successfully updated");
    },
    onError: () => {
      addSnackbar("Something went wrong.");
    },
  });
};
