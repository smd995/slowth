import { useRef, useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";

import { Dropdown } from "@/components/atom/dropdown";
import { Calendar } from "@/components/molecules/calendar";
import type { Filters } from "@/components/molecules/gatheringListPage";
import { REGION_OPTIONS, DEFAULT_REGION } from "@/constants/region";

export interface SortOption {
  label: string;
  value: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

interface FilterBarProps {
  sortOptions: SortOption[]; // 정렬 옵션 배열
  defaultSortValue?: string; // 기본 선택 정렬값
  onFilterChange?: (filters: Filters) => void; // 필터가 변경될 때 실행할 콜백
}

export const FilterBar = ({
  sortOptions,
  defaultSortValue,
  onFilterChange,
}: FilterBarProps) => {
  const [region, setRegion] = useState(DEFAULT_REGION); // 선택된 지역 상태
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // 선택된 날짜 상태
  const [sort, setSort] = useState<SortOption>( // 선택된 정렬 옵션 상태
    sortOptions.find((opt) => opt.value === defaultSortValue) ?? sortOptions[0],
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // 캘린더 드롭다운 열림 상태
  const calendarWrapperRef = useRef<HTMLDivElement>(null); // 캘린더 외부 클릭 감지용 ref
  const [isDateApplied, setIsDateApplied] = useState(false); // 날짜 적용 여부 상태

  // 필터 변경사항을 부모 컴포넌트로 전달하는 함수
  const notifyFilterChange = useCallback(
    (
      nextRegion = region, // 전달된 지역값이 없으면 현재 값 사용
      nextDate: Date | null = selectedDate, // 전달된 날짜값이 없으면 현재 값 사용
      nextSort = sort, // 전달된 정렬 옵션이 없으면 현재 값 사용
    ) => {
      if (onFilterChange) {
        onFilterChange({
          region: nextRegion,
          date: nextDate,
          sort: nextSort,
        });
      }
    },
    [region, selectedDate, sort, onFilterChange],
  );

  // 캘린더가 열렸을 때 외부 클릭하면 닫도록 설정
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarWrapperRef.current &&
        !calendarWrapperRef.current.contains(event.target as Node)
      ) {
        // 날짜가 적용되지 않은 경우 필터 초기화
        if (!isDateApplied) {
          setSelectedDate(null);
          notifyFilterChange(region, null, sort);
        }
        // 캘린더 무조건 닫기
        setIsCalendarOpen(false);
      }
    };

    // 캘린더가 열렸을 때 이벤트 등록
    if (isCalendarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // 클린업 함수로 이벤트 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarOpen, isDateApplied, region, sort, notifyFilterChange]);

  return (
    <div className="flex w-full items-center justify-between">
      {/* 왼쪽: 지역 + 날짜 필터 */}
      <div className="flex gap-2">
        {/* 지역 드롭다운 */}
        <Dropdown
          selectBehavior="select"
          placeholder="지역 전체" // 기본값으로 표시되는 텍스트
          options={REGION_OPTIONS} // 지역 옵션 배열
          value={region} // 현재 선택된 지역 값
          // 사용자가 드롭다운에서 항목을 선택했을 때 실행되는 콜백 함수
          onSelect={(val) => {
            setRegion(val);
            notifyFilterChange(val, selectedDate, sort);
          }}
          icon={{ name: "arrow", position: "right" }}
          activeStyle={region === "all" ? "light" : "dark"} // 현재 선택된 지역에 따라 드롭다운 강조 스타일 변경
          size="md"
        />

        {/* 날짜 선택용 드롭다운 */}
        <div className="relative">
          <Dropdown
            selectBehavior="action" // 클릭 시 팝업이 열리는 타입
            isOpen={isCalendarOpen} // 열림 상태 제어
            placeholder={
              selectedDate
                ? dayjs(selectedDate).format("YY/MM/DD") // 선택된 날짜 포맷 표시
                : "날짜 전체" // 선택 안됐을 경우 기본 텍스트
            }
            onTriggerClick={() => setIsCalendarOpen(!isCalendarOpen)} // 클릭 시 열고 닫기
            icon={{ name: "arrow", position: "right" }}
            activeStyle={isDateApplied ? "dark" : "light"} // 날짜가 적용됐으면 강조
            size="md"
            onSelect={() => {}} // selectBehavior가 action일 경우 불필요
          />

          {/* 실제 캘린더 팝업 */}
          {isCalendarOpen && (
            <div
              ref={calendarWrapperRef}
              className="fixed left-1/2 z-50 w-[336px] -translate-x-1/2 rounded-xl bg-white px-[10px] pt-6 pb-6 shadow-xl sm:absolute sm:top-auto sm:left-auto sm:translate-x-0"
            >
              <div className="mx-auto w-[250px]">
                <Calendar
                  mode="date" // 날짜만 선택하는 모드
                  selectedDate={selectedDate} // 현재 선택된 날짜
                  onApply={(appliedDate) => {
                    setSelectedDate(appliedDate); // 선택 날짜 저장
                    setIsDateApplied(!!appliedDate); // 적용 여부 true
                    setIsCalendarOpen(false); // 팝업 닫기
                    notifyFilterChange(region, appliedDate, sort); // 변경사항 부모로 전달
                  }}
                  onReset={() => {
                    setSelectedDate(null); // 초기화
                    setIsDateApplied(false);
                    notifyFilterChange(region, null, sort);
                    setIsCalendarOpen(false);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 오른쪽: 정렬 필터 */}
      <Dropdown
        selectBehavior="select"
        placeholder="정렬 기준"
        options={sortOptions.map(({ label, value }) => ({ label, value }))} // label, value만 전달
        value={sort.value} // 현재 선택된 값
        onSelect={(val) => {
          const selected = sortOptions.find((opt) => opt.value === val)!; // 선택된 옵션 찾기
          setSort(selected); // 상태 업데이트
          notifyFilterChange(region, selectedDate, selected); // 변경사항 부모로 전달
        }}
        icon={{ name: "sort", position: "left" }}
        activeStyle="light"
        size="md"
        customListClassName="right-0 sm:left-0" // 반응형 위치 조정
      />
    </div>
  );
};
