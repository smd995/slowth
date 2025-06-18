// hooks/useGathering.ts
import useSWR from "swr";
import { getGatheringInfo } from "@/effect/gatherings/getGatheringDetail";

export const useGatheringDetail = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `gathering-info-${id}` : null,
    () => getGatheringInfo(id),
    {
      revalidateOnReconnect: true,
    },
  );

  return {
    gathering: data?.gathering,
    participants: data?.participants || [],
    isLoading,
    isError: error,
    mutate,
  };
};
