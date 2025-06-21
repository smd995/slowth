"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { toast } from "react-toastify";

import { getGatheringList } from "@/effect/gatherings/getGatheringList";
import { DEFAULT_TYPE } from "@/constants/category";
import { DEFAULT_FILTERS } from "@/constants/filters";
import { mainSortOptions } from "@/constants/sortOptions";

import { getFormattedDate } from "@/libs/date/getFormattedDate";
import { GatheringCard } from "@/components/molecules/gatheringCard";
import { Button } from "@/components/atom/button";
import { CategoryTab } from "@/components/molecules/categoryTab";
import { PageHeader } from "@/components/molecules/pageHeader";
import { FilterBar } from "@/components/molecules/filterBar";
import { SkeletonCard } from "@/components/molecules/gatheringCardSkeleton";
import { Modal } from "@/components/atom/modal";
import { CreateGatheringModalUI } from "@/components/organisms/createGatheringModalUI";

import type { Gathering } from "@/entity/gathering";
import type { Filters } from "@/entity/filters";

// 상수 정의
const PAGE_SIZE = 10; // 한 번에 불러올 모임 수 (무한스크롤 사용 시 기준)

interface GatheringListPageProps {
  initialGatherings: Gathering[]; // 서버에서 받아온 초기 모임 데이터
}

export function GatheringListPage({
  initialGatherings,
}: GatheringListPageProps) {
  const router = useRouter();
  const { ref, inView } = useInView({ threshold: 1 });
  const isInitialMount = useRef(true); // 초기 마운트 여부를 저장하는 ref
  const [selectedType, setSelectedType] = useState(DEFAULT_TYPE);

  const [gatherings, setGatherings] = useState(initialGatherings);
  const [skip, setSkip] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  // 모임 생성 모달 열림 여부 상태
  const [isGatheringModalOpen, setIsGatheringModalOpen] = useState(false);
  // 모임 카드 클릭 시 해당 모임 상세 페이지로 이동
  const goToGatheringDetail = (id: number) => {
    router.push(`/gathering/${id}`);
  };
  // 모임 만들기 버튼 클릭 핸들러
  const handleCreateGathering = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.info("로그인이 필요합니다.");
      router.push("/login");
      return;
    }
    setIsGatheringModalOpen(true);
  };

  // 필터나 탭 변경 시, 모임 데이터를 새로 불러오는 훅
  useEffect(() => {
    setHasMore(true);
    // 초기 마운트이며 기본 필터 상태일 경우, SSR 데이터를 그대로 사용하고 API 호출은 스킵
    if (isInitialMount.current) {
      const isDefaultState =
        selectedType === DEFAULT_TYPE &&
        filters.region === "all" &&
        filters.date === null &&
        filters.sort.value === mainSortOptions[0].value;

      if (isDefaultState) {
        console.log("초기 상태로 API 호출 생략");
        isInitialMount.current = false;
        return;
      }
    } else {
      console.log("필터 변경으로 API 호출");
      // 필터가 바뀌었거나, 최초가 아니면 API 호출
      const formattedDate = getFormattedDate(filters.date);
      const controller = new AbortController();
      const signal = controller.signal;

      const requestParams = {
        region: filters.region !== "all" ? filters.region : undefined,
        date: formattedDate, // 포맷된 날짜
        sortBy: filters.sort.sortBy, // 정렬 기준
        sortOrder: filters.sort.sortOrder, // 정렬 순서
        type: selectedType, // 선택된 모임 타입
      };

      console.log("hasMore 상태:", hasMore);

      setIsLoading(true);
      setGatherings([]); // 기존 리스트 초기화
      setSkip(PAGE_SIZE); // 다음 요청을 위해 초기화

      getGatheringList(0, PAGE_SIZE, requestParams, signal)
        .then((data) => {
          console.log("탭변경-isLoading 상태:", isLoading);
          if (data.length === 0) {
            setHasMore(false);
          } else {
            setGatherings((prev) => [...prev, ...data]);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          if (err.name !== "AbortError") {
            console.error("필터 변경 실패", err);
            setIsLoading(false);
          }
        });

      return () =>
        controller.abort({
          name: "AbortError",
          message: "strict mode로 인한 API 중복 요청 방지",
        });
    }
  }, [filters, selectedType]);

  // 무한스크롤 동작을 위한 훅
  // inView가 true이고, 더 불러올 게 있으며, 로딩 중이 아닐 때만 API 호출
  useEffect(() => {
    const formattedDate = getFormattedDate(filters.date);
    const controller = new AbortController();
    const signal = controller.signal;

    const infiniteScrollParams = {
      region: filters.region !== "all" ? filters.region : undefined,
      date: formattedDate,
      sortBy: filters.sort.sortBy,
      sortOrder: filters.sort.sortOrder,
      type: selectedType,
    };

    // inView가 true이고, 더 불러올 게 있으며, 로딩 중이 아닐 때만 API 호출
    getGatheringList(skip, PAGE_SIZE, infiniteScrollParams, signal)
      .then((newData) => {
        setIsLoading(true);
        console.log("무한- isLoading 상태:", isLoading);
        if (newData.length === 0) {
          setHasMore(false);
        } else {
          setGatherings((prev) => [...prev, ...newData]);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        // AbortError는 무시, 다른 에러만 처리
        if (error.name !== "AbortError") {
          console.error("API 요청 실패:", error);
          setIsLoading(false);
        }
      });
    return () =>
      controller.abort({
        name: "AbortError",
        message: "strict mode로 인한 API 중복 요청 방지",
      });
  }, [skip, filters, selectedType, isLoading]);

  useEffect(() => {
    // inView가 true이고, 더 불러올 게 있으며, 로딩 중이 아닐 때만 skip 증가
    if (inView && hasMore && !isLoading) {
      setSkip((prev) => {
        return prev + PAGE_SIZE; // 다음 페이지를 불러오기 위해 skip 증가
      });
    }
  }, [inView, hasMore, isLoading]);

  return (
    <div className="flex flex-col">
      <h2 className="sr-only">모임 찾기</h2>

      <main style={{ minHeight: "calc(100vh - 60px)" }}>
        {/* 페이지 헤더 */}
        <PageHeader page="main" />

        {/* 상단 탭 영역 */}
        <div className="flex items-start justify-between">
          {/* 카테고리 탭 */}
          <CategoryTab setSelectedType={setSelectedType} />

          {/* 모임 만들기 버튼 */}
          <Button
            onClick={handleCreateGathering}
            className="h-11 w-[115px] cursor-pointer"
          >
            모임 만들기
          </Button>
        </div>

        {/* 지역, 날짜, 정렬 필터를 한 줄로 보여주는 필터바 */}
        <div className="mt-4 border-t-2 border-gray-200 pt-3 sm:pt-4">
          <FilterBar
            sortOptions={mainSortOptions} // 정렬 옵션 목록
            defaultSortValue="closingSoon" // 기본 정렬값
            onFilterChange={({ region, date, sort }) => {
              setFilters({ region, date, sort }); // 필터 상태 업데이트
            }}
          />
        </div>

        {/* 모임 카드 리스트 */}
        <div className="mt-6 flex flex-col gap-4">
          {gatherings.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center text-gray-500">
              <p className="leading-lg">
                아직 모임이 없어요.
                <br />
                지금 바로 모임을 만들어보세요!
              </p>
            </div>
          ) : (
            <>
              {gatherings.map((gathering, index) => (
                <GatheringCard
                  key={`${gathering.id}-${index}`}
                  gathering={gathering}
                  isDimmed={false}
                  // index={index}
                  onClick={() => goToGatheringDetail(gathering.id)}
                />
              ))}
            </>
          )}
          {/* 로딩 중일 때 스켈레톤 UI 표시 */}
          {isLoading && (
            <div className="flex flex-col gap-4">
              {[...Array(6)].map((_, idx) => (
                <SkeletonCard key={idx} />
              ))}
            </div>
          )}
        </div>

        {/* 리스트가 10개 이상이고, 더 불러올 게 있을 때만 옵저버 동작 */}
        <div ref={ref} className="h-10 w-full overflow-hidden opacity-0" />
      </main>

      <Modal
        size="w-[90%] max-w-[600px]"
        isOpen={isGatheringModalOpen}
        title="모임 만들기"
        onClose={() => setIsGatheringModalOpen(false)}
      >
        <CreateGatheringModalUI
          onClose={() => setIsGatheringModalOpen(false)}
        />
      </Modal>
      {/* 모임 만들기 모달: isOpen 상태에 따라 노출 */}
      {/* <GatheringModal
        isOpen={isGatheringModalOpen} // 열림 여부
        onClose={() => setIsGatheringModalOpen(false)} // 닫기 핸들러
      /> */}
    </div>
  );
}
