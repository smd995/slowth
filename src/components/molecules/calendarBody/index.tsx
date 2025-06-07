import { Dayjs } from "dayjs";
import clsx from "clsx";

import { ArrowIcon } from "@/components/icons/ArrowIcon";

interface CalendarBodyProps {
  currentMonth: Dayjs; // 현재 달력에 표시할 월 (dayjs 객체)
  localSelectedDate: Dayjs | null; // 현재 선택된 날짜
  handlePrevMonth: () => void; // 이전 달로 이동할 함수
  handleNextMonth: () => void; // 다음 달로 이동할 함수
  handleDateClick: (day: number) => void; // 날짜 클릭 시 실행할 함수
  formattedMonths: string[]; // 월 이름 리스트 (Jan, Feb, ...)
  formattedWeekdays: string[]; // 요일 이름 리스트 (Sun, Mon, ...)
  days: (number | null)[]; // 달력에 표시할 날짜 배열 (날짜가 없으면 null)
}

export function CalendarBody({
  currentMonth,
  localSelectedDate,
  handlePrevMonth,
  handleNextMonth,
  handleDateClick,
  formattedMonths,
  formattedWeekdays,
  days,
}: CalendarBodyProps) {
  return (
    <>
      {/* 월 이동 */}
      <div className="flex h-8.5 items-center justify-between">
        {/* 이전 달 이동 버튼 */}
        <button onClick={handlePrevMonth} className="p-2">
          <ArrowIcon direction="left" fill="#1A1A1A" className="h-5 w-5" />
        </button>
        {/* 현재 월과 연도 표시 */}
        <span className="text-secondary-800 text-sm font-medium">
          {formattedMonths[currentMonth.month()]} {currentMonth.year()}
        </span>
        {/* 다음 달 이동 버튼 */}
        <button onClick={handleNextMonth} className="p-2">
          <ArrowIcon direction="right" fill="#1A1A1A" className="h-5 w-5" />
        </button>
      </div>

      {/* 요일 헤더 */}
      <div
        className={`grid h-8 grid-cols-7 items-center text-center text-sm font-semibold text-gray-800`}
      >
        {formattedWeekdays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 text-center">
        {days.map((day, index) => {
          // 현재 날짜가 null이 아니고, 선택된 날짜와 같은 경우
          const isSelectedDay =
            day && localSelectedDate?.isSame(currentMonth.date(day), "day");

          return (
            <button
              key={index}
              type="button"
              disabled={!day} // day가 없으면 비활성화
              className={clsx(
                "flex h-8 w-8 items-center justify-center rounded-full",
                isSelectedDay && "bg-primary-500 rounded-lg text-white", // 선택된 날짜는 배경색과 글자색 변경
              )}
              onClick={() => day && handleDateClick(day)}
            >
              {day}
            </button>
          );
        })}
      </div>
    </>
  );
}
