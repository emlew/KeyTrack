import { useMutation } from "@tanstack/react-query";
import { useSupabase } from "./useSupabase";
import { useInvalidateQueries } from "./useInvalidateQueries";
import { EventCreate, ShiftCreate } from "@/api";
import { useSnackbar } from "./useSnackbar";

export const useCreateEvent = (event: EventCreate, shifts: ShiftCreate[]) => {
  const client = useSupabase();
  const mutationKey = ["create_event"];
  const invalidateQueries = useInvalidateQueries();
  const { addSnackbar } = useSnackbar();

  const mutationFn = async () => {
    const assignIds = (id: number) => {
      if (id == 0) return [];
      shifts.forEach((s) => (s.event_id = id));
      return shifts;
    };

    return await client
      .from("events")
      .insert([event])
      .select()
      .then((res) =>
        client.from("shifts").insert(assignIds(res.data ? res.data[0].id : 0))
      );
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
      addSnackbar("Event successfully created");
    },
    onError: () => {
      addSnackbar("Something went wrong.");
    },
  });
};
