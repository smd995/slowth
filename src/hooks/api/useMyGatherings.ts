import useSWR from "swr";
import { getMyGatherings } from "@/effect/gatherings/getMyGatherings";
import { JoinedGathering } from "@/entity/gathering";

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
