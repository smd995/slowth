// SWR 기반 모임 리스트 무한스크롤 커스텀 훅
// useSWRInfinite를 사용하여 캐싱과 무한스크롤을 자동으로 처리합니다.

import { useMemo, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useSWRInfinite from "swr/infinite";
import { getGatheringListCSR } from "@/effect/gatherings/getGatheringListCSR";
import type { Gathering } from "@/entity/gathering";
import type { Filters } from "@/entity/filters";
import dayjs from "dayjs";

const PAGE_SIZE = 10;
const MIN_DISPLAY_COUNT = 6; // 최소 보여줄 개수

// 현재 시간 기준으로 유효한 모임인지 확인 (UTC 기준)
const isValidGathering = (gathering: Gathering): boolean => {
  const now = new Date(); // 현재 시간 (UTC 기준으로 비교)

  const gatheringDate = new Date(gathering.dateTime);
  const registrationEndDate = new Date(gathering.registrationEnd);

  // 취소된 모임이거나 모임 날짜/등록 마감일이 지난 모임은 제외
  if (
    gathering.canceledAt ||
    gatheringDate < now ||
    registrationEndDate < now
  ) {
    return false;
  }

  return true;
};

interface UseGatheringListProps {
  initialGatherings?: Gathering[];
  selectedType: string;
  filters: Filters;
}

export const useGatheringList = ({
  initialGatherings = [],
  selectedType,
  filters,
}: UseGatheringListProps) => {
  const { ref, inView } = useInView({ threshold: 1 });

  // SWR 키 생성 - 필터가 변경되면 새로운 키가 생성되어 캐시가 초기화됨
  const swrKey = useMemo(() => {
    const formattedDate = filters.date
      ? dayjs(filters.date).format("YYYY-MM-DD")
      : undefined;
    return {
      region: filters.region !== "all" ? filters.region : undefined,
      date: formattedDate,
      sortBy: filters.sort.sortBy,
      sortOrder: filters.sort.sortOrder,
      type: selectedType,
    };
  }, [filters, selectedType]);

  // SWR Infinite 설정
  const { data, error, isLoading, isValidating, size, setSize, mutate } =
    useSWRInfinite(
      (pageIndex, previousPageData) => {
        // 이전 페이지가 비어있으면 더 이상 데이터가 없음
        if (previousPageData && previousPageData.length === 0) return null;

        return [swrKey, pageIndex * PAGE_SIZE]; // [필터정보, offset]
      },
      async ([filterParams, offset]) => {
        const data = await getGatheringListCSR(offset, PAGE_SIZE, filterParams);
        return data;
      },
      {
        // 첫 페이지에만 초기 데이터 사용 (SSR 데이터)
        fallbackData:
          initialGatherings.length > 0 ? [initialGatherings] : undefined,
        revalidateFirstPage: false, // 첫 페이지 재검증 비활성화
        revalidateOnFocus: false, // 포커스 시 재검증 비활성화
        dedupingInterval: 60000, // 1분간 중복 요청 방지
      },
    );

  // 모든 페이지의 데이터를 하나의 배열로 합치고 유효한 모임만 필터링
  const gatherings = useMemo(() => {
    if (!data) return [];
    return data.flat().filter(isValidGathering);
  }, [data]);

  // 더 불러올 데이터가 있는지 확인
  const hasMore = useMemo(() => {
    if (!data) return true;
    const lastPage = data[data.length - 1];
    return lastPage && lastPage.length === PAGE_SIZE;
  }, [data]);

  // 자동 재로딩: 필터링 후 개수가 적으면 더 가져오기
  useEffect(() => {
    if (
      !isLoading &&
      !isValidating &&
      hasMore &&
      gatherings.length < MIN_DISPLAY_COUNT &&
      gatherings.length < size * PAGE_SIZE && // 무한 루프 방지
      data &&
      data.length > 0
    ) {
      setSize(size + 1);
    }
  }, [
    gatherings.length,
    hasMore,
    isLoading,
    isValidating,
    size,
    setSize,
    data,
  ]);

  // 무한스크롤 트리거
  useEffect(() => {
    if (inView && hasMore && !isLoading && !isValidating) {
      setSize(size + 1);
    }
  }, [inView, hasMore, isLoading, isValidating, size, setSize]);

  return {
    gatherings,
    isLoading: isLoading || isValidating,
    hasMore,
    error: error ? "모임 목록을 불러오는 데 실패했습니다" : null,
    ref, // 무한스크롤 감지용 ref
    mutate, // 수동 재검증용
  };
};
