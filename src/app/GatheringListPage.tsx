// GatheringListPage.tsx

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
  { label: "달램핏", value: "dal", icon: "meditation" },
  { label: "워케이션", value: "vacation", icon: "vacation" },
];

// 하위 탭
const subTabs: Record<string, string[]> = {
  dal: ["전체", "오피스 스트레칭", "마인드풀니스", "요가"],
  vacation: ["전체", "제주", "강릉", "양양"],
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
  const [selectedChip, setSelectedChip] = useState(
    subTabs[topTabs[0].value][0],
  );
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
    router.push(`/detail/${id}`);
  };

  const getFormattedDate = (date: Date | null) => {
    if (!date) return undefined;
    const utcDate = new Date(date.getTime() - 9 * 60 * 60 * 1000);
    return utcDate.toISOString().split("T")[0]; // 'YYYY-MM-DD'
  };

  useEffect(() => {
    const formattedDate = getFormattedDate(filters.date);
    getGatheringList(0, 10, {
      region: filters.region !== "all" ? filters.region : undefined,
      date: formattedDate,
      sortBy: filters.sort.sortBy,
      sortOrder: filters.sort.sortOrder,
    }).then((newData) => {
      setGatherings(newData);
      setSkip(10);
      setHasMore(true);
    });
  }, [filters]);

  useEffect(() => {
    if (inView && hasMore) {
      const formattedDate = getFormattedDate(filters.date);
      getGatheringList(skip, 10, {
        region: filters.region !== "all" ? filters.region : undefined,
        date: formattedDate,
        sortBy: filters.sort.sortBy,
        sortOrder: filters.sort.sortOrder,
      }).then((newData) => {
        if (newData.length === 0) {
          setHasMore(false);
        } else {
          setGatherings((prev) => [...prev, ...newData]);
          setSkip((prev) => prev + 10);
        }
      });
    }
  }, [inView, skip, filters, hasMore]);

  useEffect(() => {
    setSelectedChip(subTabs[selectedTopTab.value][0]);
  }, [selectedTopTab]);

  return (
    <main className="flex flex-col bg-gray-100">
      <h2 className="sr-only">모임 찾기</h2>

      <section
        style={{ minHeight: "calc(100vh - 60px)" }}
        className="bg-secondary-50 mx-auto w-full max-w-[1200px] px-[100px] py-10"
      >
        <PageHeader />

        <div className="flex items-center justify-between">
          <Tabs
            tabs={topTabs}
            selectedTab={selectedTopTab}
            onChange={(tab) => setSelectedTopTab(tab)}
          />
          <Button
            onClick={() => console.log("모임 만들기")}
            className="h-11 w-[115px] cursor-pointer"
          >
            모임 만들기
          </Button>
        </div>

        <div className="mt-3.5 flex flex-wrap gap-2">
          {chips.map((label) => (
            <Chip
              key={label}
              label={label}
              selected={selectedChip === label}
              onClick={() => setSelectedChip(label)}
              size="md"
            />
          ))}
        </div>

        <div className="mt-4 border-t-2 border-gray-200 pt-4">
          <FilterBar
            sortOptions={mainSortOptions}
            defaultSortValue="latest"
            onFilterChange={({ region, date, sort }) => {
              setFilters({ region, date, sort });
            }}
          />
        </div>

        <div className="mt-6 flex flex-col gap-4">
          {gatherings.map((gathering) => (
            <GatheringCard
              key={gathering.id}
              gathering={gathering}
              isDimmed={false}
              onClick={() => goToGatheringDetail(gathering.id)}
            />
          ))}
        </div>

        <div ref={ref} className="h-10 w-full overflow-hidden opacity-0" />
      </section>
    </main>
  );
}
