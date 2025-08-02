import useSWR from "swr";
import { getMyGatherings } from "@/entities/gathering";
import { JoinedGathering } from "@/entities/gathering";

export const useMyGatherings = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "my-gatherings",
    () => getMyGatherings({ limit: 100, offset: 0 }),
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
