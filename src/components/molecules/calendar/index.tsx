"use client";

import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

import { CalendarBody } from "@/components/molecules/calendarBody";
import { TimeColumn } from "@/components/atom/timeColumn";
import { Button } from "@/components/atom/button";

interface CalendarProps {
  mode: "date" | "datetime"; // 날짜만 선택 or 날짜+시간 선택
  selectedDate: Date | null; // 선택된 초기 날짜 값
  onApply?: (date: Date | null) => void; // 적용 버튼 클릭 시 호출할 함수
  onReset?: () => void; // 초기화 버튼 클릭 시 호출할 함수
}

// 오전/오후 구분 타입
type TimePeriod = "AM" | "PM";

// 상수 정의
const HOURS_IN_HALF_DAY = 12; // 12시간 체계
const MONTHS_IN_YEAR = 12; // 1년은 12개월
const DAYS_IN_WEEK = 7; // 1주는 7일
const HOUR_ITEMS = Array.from({ length: HOURS_IN_HALF_DAY }, (_, i) =>
  String(i + 1).padStart(2, "0"),
);
const MINUTE_ITEMS = Array.from({ length: 60 / 5 }, (_, i) =>
  String(i * 5).padStart(2, "0"),
);

const today = dayjs();
const formattedMonths = Array.from({ length: MONTHS_IN_YEAR }, (_, i) =>
  dayjs().month(i).format("MMM"),
);
const formattedWeekdays = Array.from({ length: DAYS_IN_WEEK }, (_, i) =>
  dayjs().day(i).format("ddd"),
);

export const Calendar = ({
  mode,
  selectedDate,
  onApply,
  onReset,
}: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(today); // 현재 표시 중인 월 (기본값: 오늘)
  const [localSelectedDate, setLocalSelectedDate] = useState<Dayjs | null>(
    selectedDate ? dayjs(selectedDate) : today,
  ); // 사용자가 선택한 날짜 (초기값: selectedDate 또는 오늘)

  // 시간, 분, 오후/오전 선택 상태 (mode가 'datetime'일 때만 사용)
  const [hour, setHour] = useState(() => {
    const h = localSelectedDate?.hour() ?? today.hour();
    return h === 0
      ? HOURS_IN_HALF_DAY
      : h > HOURS_IN_HALF_DAY
        ? h - HOURS_IN_HALF_DAY
        : h; // 시간 (기본값: 현재 시간, 0시인 경우 12시로 표시)
  });
  const [minute, setMinute] = useState(
    localSelectedDate?.minute() ?? today.minute(), // 분 (기본값: 현재 분)
  );
  const [timePeriod, setTimePeriod] = useState<TimePeriod>(
    (localSelectedDate?.hour() ?? today.hour()) >= HOURS_IN_HALF_DAY
      ? "PM"
      : "AM", // 오전/오후 (기본값: 현재 시간에 따라 결정)
  );

  // 월 이동
  const handlePrevMonth = () => {
    setCurrentMonth((prev) => prev.subtract(1, "month")); // 이전 달로 이동
  };
  const handleNextMonth = () => {
    setCurrentMonth((prev) => prev.add(1, "month")); // 다음 달로 이동
  };

  // 날짜 클릭 시
  const handleDateClick = (day: number) => {
    let newDate = currentMonth.date(day); // 선택한 날짜로 새로운 Dayjs 객체 생성

    if (mode === "datetime") {
      // 날짜와 시간을 모두 선택하는 모드일 때
      const updatedHour =
        timePeriod === "PM"
          ? (hour % HOURS_IN_HALF_DAY) + HOURS_IN_HALF_DAY
          : hour % HOURS_IN_HALF_DAY; // 시간 업데이트 (오후/오전 구분)
      newDate = newDate
        .hour(updatedHour)
        .minute(minute)
        .second(0)
        .millisecond(0); // 시간, 분, 초, 밀리초 설정
    } else {
      // 날짜만 선택하는 모드일 때
      newDate = newDate.startOf("day"); // 시간 초기화 (00:00:00)
    }
    setLocalSelectedDate(newDate); // 선택된 날짜 업데이트
  };

  // 초기화 버튼 클릭 시
  const handleReset = () => {
    setLocalSelectedDate(null);
    setCurrentMonth(today);
    setHour(HOURS_IN_HALF_DAY);
    setMinute(0);
    setTimePeriod("AM");

    // 선택된 날짜를 초기화하고, 부모 컴포넌트에 알림
    onApply?.(null);
    onReset?.();
  };

  // 시간, 분, 오전/오후 변경 핸들러
  const handleHourChange = (value: number) => {
    if (!localSelectedDate) return;
    setHour(value);

    const updatedHour =
      timePeriod === "PM"
        ? (value % HOURS_IN_HALF_DAY) + HOURS_IN_HALF_DAY
        : value % HOURS_IN_HALF_DAY;
    const updatedDate = localSelectedDate.hour(updatedHour);
    setLocalSelectedDate(updatedDate);
  };
  const handleMinuteChange = (value: number) => {
    if (!localSelectedDate) return;
    setMinute(value);

    const updatedDate = localSelectedDate.minute(value);
    setLocalSelectedDate(updatedDate);
  };
  const handleTimePeriodChange = (value: TimePeriod) => {
    if (!localSelectedDate) return;
    setTimePeriod(value);

    const currentHour = localSelectedDate.hour() % HOURS_IN_HALF_DAY;
    const updatedHour =
      value === "PM" ? currentHour + HOURS_IN_HALF_DAY : currentHour;
    const updatedDate = localSelectedDate.hour(updatedHour);
    setLocalSelectedDate(updatedDate);
  };

  // 달력에 표시할 일자 배열 생성
  const startDay = currentMonth.startOf("month").day(); // 현재 월의 시작 요일 (0: 일요일 ~ 6: 토요일)
  const lastDate = currentMonth.daysInMonth(); // 현재 월의 총 일수
  const days = Array.from({ length: startDay + lastDate }, (_, index) => {
    const day = index - startDay + 1;
    return day > 0 ? day : null;
  });

  return (
    <div>
      {/* datetime 모드: 날짜+시간 선택 */}
      {mode === "datetime" ? (
        <div className="flex">
          {/* 달력 */}
          <div className="w-[280px] flex-shrink-0 border-r border-gray-200 pt-2.5 pr-5 pb-4 pl-2.5">
            <CalendarBody
              currentMonth={currentMonth}
              localSelectedDate={localSelectedDate}
              handlePrevMonth={handlePrevMonth}
              handleNextMonth={handleNextMonth}
              handleDateClick={handleDateClick}
              formattedMonths={formattedMonths}
              formattedWeekdays={formattedWeekdays}
              days={days}
            />
          </div>

          {/* 시간 선택 */}
          <div className="flex gap-2.5 pl-2.5">
            <TimeColumn
              items={HOUR_ITEMS}
              selected={hour.toString().padStart(2, "0")}
              onSelect={(value) => handleHourChange(parseInt(value))}
            />
            <div className="border-l border-gray-200" />
            <TimeColumn
              items={MINUTE_ITEMS}
              selected={minute.toString().padStart(2, "0")}
              onSelect={(value) => handleMinuteChange(parseInt(value))}
            />
            <div className="border-l border-gray-200" />
            <TimeColumn
              items={["AM", "PM"]}
              selected={timePeriod}
              onSelect={(value) => handleTimePeriodChange(value as TimePeriod)}
            />
          </div>
        </div>
      ) : (
        // date 모드: 날짜만 선택
        <>
          {/* 달력 */}
          <CalendarBody
            currentMonth={currentMonth}
            localSelectedDate={localSelectedDate}
            handlePrevMonth={handlePrevMonth}
            handleNextMonth={handleNextMonth}
            handleDateClick={handleDateClick}
            formattedMonths={formattedMonths}
            formattedWeekdays={formattedWeekdays}
            days={days}
          />

          {/* 버튼 */}
          <div className="mt-3 flex gap-4">
            <Button
              size="md"
              variant="outline"
              className="w-full"
              onClick={handleReset} // 초기화 버튼 클릭 시 handleReset 함수 호출
            >
              초기화
            </Button>
            <Button
              size="md"
              variant="primary"
              className="w-full"
              onClick={() => {
                if (localSelectedDate) {
                  onApply?.(localSelectedDate.toDate()); // 선택된 날짜를 부모 컴포넌트에 전달
                }
              }}
            >
              적용
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
