import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "./useSupabase";

export const useWorkersData = () => {
  const client = useSupabase();
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
