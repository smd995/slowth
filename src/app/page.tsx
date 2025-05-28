"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/atom/button";
import { Chip } from "@/components/atom/chip";
import { Tabs, type Tab } from "@/components/atom/tabs";
import { PageHeader } from "@/components/molecules/pageHeader";
import { FilterBar, type SortOption } from "@/components/molecules/filterBar";

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

export default function Home() {
  const [selectedTopTab, setSelectedTopTab] = useState(topTabs[0]);
  const [selectedChip, setSelectedChip] = useState(
    subTabs[topTabs[0].value][0],
  );
  const chips = subTabs[selectedTopTab.value];

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

        {/* 상단 탭 & 버튼 */}
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

        {/* 하단 카테고리 */}
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

        {/* 필터 */}
        <div className="mt-4 border-t-2 border-gray-200 pt-4">
          <FilterBar
            sortOptions={mainSortOptions}
            defaultSortValue="latest"
            onFilterChange={({ region, date, sort }) => {
              // 추후 fetch에 사용할 수 있음
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
      </section>
    </main>
  );
}
