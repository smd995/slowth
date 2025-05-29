"use client";

import { useState } from "react";
import { Dropdown } from "@/components/atom/dropdown";

// 지역 옵션 (공통) : 추후 /constant/regionOptions.ts로 분리 예정
const regionOptions = [
  { label: "지역 전체", value: "all" },
  { label: "건대입구", value: "gundae" },
  { label: "을지로 3가", value: "euljiro" },
  { label: "신림", value: "sillim" },
  { label: "홍대입구", value: "hongdae" },
];

// 타입 정의
export interface SortOption {
  label: string;
  value: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

interface FilterBarProps {
  sortOptions: SortOption[];
  defaultSortValue?: string;
  onFilterChange?: (filters: {
    region: string;
    date: string;
    sort: SortOption;
  }) => void;
}

export const FilterBar = ({
  sortOptions,
  defaultSortValue,
  onFilterChange,
}: FilterBarProps) => {
  const [region, setRegion] = useState("all");
  const [date] = useState("all"); // 추후 수정 const [date, setDate] = useState("all");

  const initialSort =
    sortOptions.find((opt) => opt.value === defaultSortValue) ?? sortOptions[0];
  const [sort, setSort] = useState<SortOption>(initialSort);

  // 필터 상태가 변경될 때 상위에 알림 (선택)
  const notifyFilterChange = (
    nextRegion = region,
    nextDate = date,
    nextSort = sort,
  ) => {
    if (onFilterChange) {
      onFilterChange({
        region: nextRegion,
        date: nextDate,
        sort: nextSort,
      });
    }
  };

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex gap-2">
        {/* 지역 필터 */}
        <Dropdown
          openType="list"
          selectBehavior="select"
          placeholder="지역 전체"
          options={regionOptions}
          value={region}
          onSelect={(val) => {
            setRegion(val);
            notifyFilterChange(val, date, sort);
          }}
          icon={{ name: "arrow", position: "right" }}
          activeStyle="dark"
          size="md"
        />

        {/* 날짜 필터 */}
        <Dropdown
          openType="modal"
          selectBehavior="action"
          placeholder="날짜 전체"
          onTriggerClick={() => alert("날짜 선택 모달 열기")}
          icon={{ name: "arrow", position: "right" }}
          activeStyle="dark"
          size="md"
          onSelect={() => {}}
        />
      </div>

      {/* 정렬 필터 */}
      <Dropdown
        openType="list"
        selectBehavior="select"
        placeholder="정렬 기준"
        options={sortOptions.map(({ label, value }) => ({ label, value }))}
        value={sort.value}
        onSelect={(val) => {
          const selected = sortOptions.find((opt) => opt.value === val)!;
          setSort(selected);
          notifyFilterChange(region, date, selected);
        }}
        icon={{ name: "sort", position: "left" }}
        activeStyle="light"
        size="md"
      />
    </div>
  );
};
