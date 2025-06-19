import { Gathering } from "@/entity/gathering";
import { getGatheringDetail } from "@/effect/gatherings/getGatheringDetail";
import useLikeStore from "@/stores/useLikeStore";
import { useEffect, useState, useCallback } from "react";

export const useLikedGatherings = () => {
  const { likedGatheringIds } = useLikeStore();
  const [gatherings, setGatherings] = useState<Gathering[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLikedGatherings = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    if (likedGatheringIds.length === 0) {
      setGatherings([]);
      setIsLoading(false);
      return;
    }

    try {
      const promises = likedGatheringIds.map((id) =>
        getGatheringDetail(`${id}`),
      );
      const results = await Promise.allSettled(promises);

      // 성공한 것만 필터링
      const validGatherings = results
        .filter(
          (result): result is PromiseFulfilledResult<Gathering> =>
            result.status === "fulfilled",
        )
        .map((result) => result.value);

      setGatherings(validGatherings);

      // 실패한 요청이 있으면 에러 상태 설정
      const failedCount = results.filter(
        (result) => result.status === "rejected",
      ).length;

      if (failedCount > 0) {
        setError(`${failedCount}개 모임 정보를 불러오지 못했습니다.`);
      }
    } catch (error) {
      setError("찜한 모임을 불러오는 중 오류가 발생했습니다.");
      console.error("Error fetching liked gatherings:", error);
    } finally {
      setIsLoading(false);
    }
  }, [likedGatheringIds]); // likedGatheringIds만 의존성으로 추가

  useEffect(() => {
    fetchLikedGatherings();
  }, [fetchLikedGatherings]); // fetchLikedGatherings를 의존성으로 추가

  return {
    gatherings,
    isLoading,
    error,
    refetch: fetchLikedGatherings,
  };
};
