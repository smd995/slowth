"use client";

// 클라이언트 컴포넌트: 무한 스크롤 + 동적 데이터 로딩 담당
// useState, useEffect, useInView (react-intersection-observer) 사용
// 초기 데이터는 SSR에서 전달받아 사용합니다.

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getGatheringList } from "@/effect/gatherings/getGatheringList";
import { GatheringCard } from "@/components/molecules/gatheringCard";
import { Button } from "@/components/atom/button";
import { Chip } from "@/components/atom/chip";
import { Tabs, type Tab } from "@/components/atom/tabs";
import { PageHeader } from "@/components/molecules/pageHeader";
import { FilterBar, type SortOption } from "@/components/molecules/filterBar";
import type { Gathering } from "@/entity/gathering";

// 상위 카테고리 탭 리스트
const topTabs: Tab[] = [
  { label: "달램핏", value: "dal", icon: "meditation" },
  { label: "워케이션", value: "vacation", icon: "vacation" },
];

// 하위 카테고리 탭 리스트
const subTabs: Record<string, string[]> = {
  dal: ["전체", "오피스 스트레칭", "마인드풀니스", "요가"],
  vacation: ["전체", "제주", "강릉", "양양"],
};

// 메인 페이지용 정렬 옵션
const mainSortOptions: SortOption[] = [
  {
    label: "최신 순",
    value: "latest",
    sortBy: "dateTime",
    sortOrder: "desc",
  },
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

interface GatheringListPageProps {
  initialGatherings: Gathering[];
}

export function GatheringListPage({
  initialGatherings,
}: GatheringListPageProps) {
  const [selectedTopTab, setSelectedTopTab] = useState(topTabs[0]);
  const [selectedChip, setSelectedChip] = useState(
    subTabs[topTabs[0].value][0],
  );
  const [gatherings, setGatherings] = useState(initialGatherings);
  const [skip, setSkip] = useState(10); // 이미 10개 가져왔으니 10부터 시작
  const { ref, inView } = useInView({ threshold: 0.5 });

  const chips = subTabs[selectedTopTab.value];

  // 탭 변경 시 하위 카테고리 초기화
  useEffect(() => {
    setSelectedChip(subTabs[selectedTopTab.value][0]);
  }, [selectedTopTab]);

  // inView 트리거: 화면 하단에 로딩 영역이 보이면 추가 데이터 fetch (무한 스크롤)
  useEffect(() => {
    if (inView) {
      getGatheringList(skip, 10).then((newData) => {
        setGatherings((prev) => [...prev, ...newData]);
        setSkip((prev) => prev + 10);
      });
    }
  }, [inView]);

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
              console.log(
                "필터 선택됨:",
                region,
                date,
                sort.sortBy,
                sort.sortOrder,
              );
            }}
          />
        </div>

        <div className="mt-6 flex flex-col gap-4">
          {gatherings.map((gathering) => (
            <GatheringCard
              key={gathering.id}
              gathering={gathering}
              isLiked={false}
              isDimmed={false}
              onClick={() => console.log("카드 클릭")}
            />
          ))}
        </div>

        {/* 무한 스크롤을 위한 로딩 영역 */}
        <div ref={ref} className="h-10 w-full overflow-hidden opacity-0" />
      </section>
    </main>
  );
}
