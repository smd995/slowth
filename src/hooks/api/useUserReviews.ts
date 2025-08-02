import useSWR from "swr";
import { getReviews, ReviewDetail } from "@/entities/review";

export const useUserReviews = (userId: number | undefined) => {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `user-reviews-${userId}` : null,
    () => getReviews({ limit: 100, userId: userId }),
    {
      revalidateOnReconnect: true,
    },
  );

  return {
    reviews: (data?.data as ReviewDetail[]) || [],
    isLoading,
    isError: error,
    mutate,
  };
};
