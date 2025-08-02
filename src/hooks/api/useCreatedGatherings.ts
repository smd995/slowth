import useSWR from "swr";
import { getCreatedGatherings } from "@/entities/gathering";
import { JoinedGathering } from "@/entities/gathering";

export const useCreatedGatherings = (userId: number | undefined) => {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `created-gatherings-${userId}` : null,
    () => getCreatedGatherings(100, 0, userId!),
    {
      revalidateOnReconnect: true,
    },
  );

  return {
    gatherings: (data as JoinedGathering[]) || [],
    isLoading,
    isError: error,
    mutate,
  };
};
