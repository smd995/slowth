import { useRef, useState, useEffect, useMemo } from "react";
import { Dropdown } from "@/components/atom/dropdown";
import { Calendar } from "@/components/molecules/calendar";
import type { Filters } from "@/app/GatheringListPage";
import dayjs from "dayjs";

// 지역 옵션 (공통) : 추후 /constant/regionOptions.ts로 분리 예정
const regionOptions = [
  { label: "지역 전체", value: "all" },
  { label: "건대입구", value: "건대입구" },
  { label: "을지로3가", value: "을지로3가" },
  { label: "신림", value: "신림" },
  { label: "홍대입구", value: "홍대입구" },
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
  onFilterChange?: (filters: Filters) => void;
}

export const FilterBar = ({
  sortOptions,
  defaultSortValue,
  onFilterChange,
}: FilterBarProps) => {
  const [region, setRegion] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [sort, setSort] = useState<SortOption>(
    sortOptions.find((opt) => opt.value === defaultSortValue) ?? sortOptions[0],
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarWrapperRef = useRef<HTMLDivElement>(null);

  // 오늘 날짜 useMemo로 고정
  const today = useMemo(() => new Date(), []);

  // 외부 클릭 시 캘린더 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarWrapperRef.current &&
        !calendarWrapperRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };
    if (isCalendarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarOpen]);

  // 필터 상태가 변경될 때 상위에 알림 (선택)
  const notifyFilterChange = (
    nextRegion = region,
    nextDate: Date | null = selectedDate,
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
            notifyFilterChange(val, selectedDate, sort);
          }}
          icon={{ name: "arrow", position: "right" }}
          activeStyle="dark"
          size="md"
        />

        {/* 날짜 필터 */}
        <div className="relative">
          <Dropdown
            openType="modal"
            selectBehavior="action"
            placeholder={
              selectedDate
                ? dayjs(selectedDate).format("YY/MM/DD")
                : "날짜 전체"
            }
            onTriggerClick={() => setIsCalendarOpen(!isCalendarOpen)}
            icon={{ name: "arrow", position: "right" }}
            activeStyle="dark"
            size="md"
            onSelect={() => {}}
          />

          {/* 캘린더 팝업 */}
          {isCalendarOpen && (
            <div
              ref={calendarWrapperRef}
              className="fixed left-1/2 z-50 w-[336px] -translate-x-1/2 rounded-xl bg-white px-[10px] pt-6 pb-6 shadow-xl sm:absolute sm:top-auto sm:left-auto sm:translate-x-0"
            >
              <div className="mx-auto w-[250px]">
                <Calendar
                  mode="date"
                  selectedDate={selectedDate || today}
                  onChange={(date) => setSelectedDate(date)}
                  onApply={(appliedDate) => {
                    setSelectedDate(appliedDate);
                    setIsCalendarOpen(false);
                    notifyFilterChange(region, appliedDate, sort);
                  }}
                />
              </div>
            </div>
          )}
        </div>
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
          notifyFilterChange(region, selectedDate, selected);
        }}
        icon={{ name: "sort", position: "left" }}
        activeStyle="light"
        size="md"
        customListClassName="right-0 sm:left-0"
      />
    </div>
  );
};
