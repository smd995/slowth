"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { getGatheringList } from "@/effect/gatherings/getGatheringList";
import { GatheringCard } from "@/components/molecules/gatheringCard";
import { Button } from "@/components/atom/button";
import { Chip } from "@/components/atom/chip";
import { Tabs, type Tab } from "@/components/atom/tabs";
import { PageHeader } from "@/components/molecules/pageHeader";
import { FilterBar, type SortOption } from "@/components/molecules/filterBar";
import type { Gathering } from "@/entity/gathering";

// 상위 탭
const topTabs: Tab[] = [
  { label: "달램핏", value: "DALLAEMFIT", icon: "meditation" },
  { label: "워케이션", value: "WORKATION", icon: "vacation" },
];

// 하위 탭
const subTabs: Record<string, { label: string; value: string }[]> = {
  DALLAEMFIT: [
    { label: "오피스 스트레칭", value: "OFFICE_STRETCHING" },
    { label: "마인드풀니스", value: "MINDFULNESS" },
  ],
  WORKATION: [], // 워케이션은 하위 카테고리 없음
};

// 정렬 옵션
const mainSortOptions: SortOption[] = [
  { label: "최신 순", value: "latest", sortBy: "dateTime", sortOrder: "desc" },
  {
    label: "마감 임박",
    value: "closingSoon",
    sortBy: "registrationEnd",
    sortOrder: "asc",
  },
  {
    label: "참여 인원 순",
    value: "participants",
    sortBy: "participantCount",
    sortOrder: "desc",
  },
];

// 필터 타입
export interface Filters {
  region: string;
  date: Date | null;
  sort: SortOption;
}

interface GatheringListPageProps {
  initialGatherings: Gathering[];
}

export function GatheringListPage({
  initialGatherings,
}: GatheringListPageProps) {
  const router = useRouter();
  const { ref, inView } = useInView({ threshold: 0.5 });

  const [selectedTopTab, setSelectedTopTab] = useState(topTabs[0]);
  const [selectedChip, setSelectedChip] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [gatherings, setGatherings] = useState(initialGatherings);
  const [skip, setSkip] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    region: "all",
    date: null,
    sort: mainSortOptions[0],
  });

  const chips = subTabs[selectedTopTab.value];

  const goToGatheringDetail = (id: number) => {
    router.push(`/gathering/${id}`);
  };

  const getFormattedDate = (date: Date | null) => {
    if (!date) return undefined;
    const utcDate = new Date(date.getTime() - 9 * 60 * 60 * 1000);
    return utcDate.toISOString().split("T")[0]; // 'YYYY-MM-DD'
  };

  // 탭 바뀔 때 자동으로 첫 칩 선택
  useEffect(() => {
    const firstChip = subTabs[selectedTopTab.value][0] ?? null;
    setSelectedChip(firstChip);

    // filters 상태도 리셋
    setSkip(0);
    setHasMore(true);
  }, [selectedTopTab]);

  useEffect(() => {
    const formattedDate = getFormattedDate(filters.date);

    getGatheringList(0, 10, {
      region: filters.region !== "all" ? filters.region : undefined,
      date: formattedDate,
      sortBy: filters.sort.sortBy,
      sortOrder: filters.sort.sortOrder,
      type: selectedChip?.value ?? selectedTopTab.value,
    }).then((newData) => {
      setGatherings(newData);
      setSkip(10);
      setHasMore(true);
    });
  }, [filters, selectedTopTab, selectedChip?.value]);

  useEffect(() => {
    if (inView && hasMore) {
      const formattedDate = getFormattedDate(filters.date);
      getGatheringList(skip, 10, {
        region: filters.region !== "all" ? filters.region : undefined,
        date: formattedDate,
        sortBy: filters.sort.sortBy,
        sortOrder: filters.sort.sortOrder,
        type: selectedChip ? selectedChip.value : selectedTopTab.value,
      }).then((newData) => {
        if (newData.length === 0) {
          setHasMore(false);
        } else {
          setGatherings((prev) => [...prev, ...newData]);
          setSkip((prev) => prev + 10);
        }
      });
    }
  }, [inView, skip, filters, hasMore, selectedTopTab, selectedChip]);

  return (
    <main className="flex flex-col bg-gray-100">
      <h2 className="sr-only">모임 찾기</h2>

      <section
        style={{ minHeight: "calc(100vh - 60px)" }}
        className="bg-secondary-50 mx-auto w-full max-w-[1200px] px-4 py-6 sm:px-6 sm:py-10 lg:px-[100px]"
      >
        <PageHeader />

        <div className="flex items-center justify-between">
          <Tabs
            tabs={topTabs}
            selectedTab={selectedTopTab}
            onChange={(tab) => {
              setSelectedChip(null); // 먼저 칩 초기화
              setSelectedTopTab(tab); // 그 다음 탭 바꿈
            }}
          />
          <Button
            onClick={() => console.log("모임 만들기")}
            className="h-11 w-[115px] cursor-pointer"
          >
            모임 만들기
          </Button>
        </div>

        {/* 칩 렌더링 */}
        {chips.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-2 sm:mt-3.5">
            {chips.map(({ label, value }) => (
              <Chip
                key={value}
                label={label}
                selected={selectedChip?.value === value}
                onClick={() => {
                  setSelectedChip({ label, value });

                  const formattedDate = getFormattedDate(filters.date);

                  getGatheringList(0, 10, {
                    region:
                      filters.region !== "all" ? filters.region : undefined,
                    date: formattedDate,
                    sortBy: filters.sort.sortBy,
                    sortOrder: filters.sort.sortOrder,
                    type: value, // 클릭한 칩의 value로 API 호출
                  }).then((newData) => {
                    setGatherings(newData); // 새 데이터로 덮어쓰기
                    setSkip(10); // skip 초기화
                    setHasMore(true); // 무한스크롤 다시 가능
                  });
                }}
              />
            ))}
          </div>
        )}

        <div className="mt-4 border-t-2 border-gray-200 pt-3 sm:pt-4">
          <FilterBar
            sortOptions={mainSortOptions}
            defaultSortValue="latest"
            onFilterChange={({ region, date, sort }) => {
              setFilters({ region, date, sort });
            }}
          />
        </div>

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
            gatherings.map((gathering, index) => (
              <GatheringCard
                key={`${gathering.id}-${index}`}
                gathering={gathering}
                isDimmed={false}
                onClick={() => goToGatheringDetail(gathering.id)}
              />
            ))
          )}
        </div>

        <div ref={ref} className="h-10 w-full overflow-hidden opacity-0" />
      </section>
    </main>
  );
}
