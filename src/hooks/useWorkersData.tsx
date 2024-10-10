import { TypedSupabaseClient } from "@/utils";
import { useQuery } from "@tanstack/react-query";

export const useWorkersData = (client: TypedSupabaseClient) => {
  const queryKey = ["workers"];

  const queryFn = async () => {
    const { data, error } = await client.from("workers").select();

    if (error) {
      console.log(error);
    }
    return await data;
  };

  return useQuery({ queryKey, queryFn });
};
