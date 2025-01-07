import { useMutation } from "@tanstack/react-query";
import { useSupabase } from "./useSupabase";
import { useInvalidateQueries } from "./useInvalidateQueries";
import { Profile } from "@/api";
import { useSnackbar } from "./useSnackbar";

export const useUpdateUserRole = () => {
  const client = useSupabase();
  const mutationKey = ["update_user_role"];
  const invalidateQueries = useInvalidateQueries();
  const { addSnackbar } = useSnackbar();

  const mutationFn = async (user: Profile) => {
    return await client
      .from("profiles")
      .update({ is_admin: user.is_admin })
      .eq("email", user.email)
      .select();
  };

  return useMutation({
    mutationKey,
    mutationFn,
    onSuccess: () => {
      invalidateQueries();
      addSnackbar("User successfully updated");
    },
  });
};
