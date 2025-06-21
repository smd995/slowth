import useSWR from "swr";
import { getMyGatherings } from "@/effect/gatherings/getMyGatherings";
import { JoinedGathering } from "@/entity/gathering";

export const useCompletedGatherings = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "completed-gatherings",
    () =>
      getMyGatherings({
        limit: 100,
        offset: 0,
        completed: true,
      }),
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
