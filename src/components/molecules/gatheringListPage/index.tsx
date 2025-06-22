"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useGatheringList } from "@/hooks/api/useGatheringList";
import { DEFAULT_TYPE } from "@/constants/category";
import { DEFAULT_FILTERS } from "@/constants/filters";
import { mainSortOptions } from "@/constants/sortOptions";

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

interface GatheringListPageProps {
  initialGatherings: Gathering[];
}

export function GatheringListPage({
  initialGatherings,
}: GatheringListPageProps) {
  const router = useRouter();

  const [selectedType, setSelectedType] = useState(DEFAULT_TYPE);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [isGatheringModalOpen, setIsGatheringModalOpen] = useState(false);

  // 커스텀 훅으로 모든 API 로직 처리
  const { gatherings, isLoading, hasMore, error, ref, mutate } =
    useGatheringList({
      initialGatherings,
      selectedType,
      filters,
    });

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
            sortOptions={mainSortOptions}
            defaultSortValue="closingSoon"
            onFilterChange={({ region, date, sort }) => {
              setFilters({ region, date, sort });
            }}
          />
        </div>

        {/* 에러 표시 */}
        {error && (
          <div className="mt-4 rounded-md bg-red-50 p-4 text-center text-red-600">
            {error}
          </div>
        )}

        {/* 모임 카드 리스트 */}
        <div className="mt-6 flex flex-col gap-4">
          {gatherings.length === 0 && !isLoading ? (
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

        {/* 무한스크롤 감지 영역 */}
        {hasMore && (
          <div ref={ref} className="h-10 w-full overflow-hidden opacity-0" />
        )}
      </main>

      {/* 모임 만들기 모달 */}
      <Modal
        size="w-[90%] max-w-[600px]"
        isOpen={isGatheringModalOpen}
        title="모임 만들기"
        onClose={() => setIsGatheringModalOpen(false)}
      >
        <CreateGatheringModalUI
          onClose={() => {
            setIsGatheringModalOpen(false);
            // 모임 생성 후 목록 새로고침
            mutate();
          }}
        />
      </Modal>
    </div>
  );
}
