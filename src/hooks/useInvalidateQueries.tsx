import { useQueryClient } from "@tanstack/react-query";

export const useInvalidateQueries = (queryKey?: string) => {
  const queryClient = useQueryClient();

  if (queryKey) {
    return () => queryClient.invalidateQueries({ queryKey: [queryKey] });
  }

  return () => queryClient.invalidateQueries();
};
