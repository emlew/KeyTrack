import { useMutation } from "@tanstack/react-query";
import { useSupabase } from "./useSupabase";

export const useSyncWorkers = (prevWorkers: number[], newWorkers: number[]) => {
  const client = useSupabase();
  const mutationKey = ["sync_workers"];

  const mutationFn = async () => {

    const inserts = newWorkers.filter((w) => !prevWorkers.includes(w));
    const deletes = prevWorkers.filter((w) => !newWorkers.includes(w));
    console.log("inserts: ");
    console.log(inserts.map((i) => i));
    console.log("deletes: ");
    console.log(deletes.map((d) => d));

    return await client.rpc("manage_workers_by_shifts", {
      shifts_to_add: newWorkers,
      shifts_to_delete: prevWorkers,
    });
  };

  return useMutation({ mutationKey, mutationFn });
};
