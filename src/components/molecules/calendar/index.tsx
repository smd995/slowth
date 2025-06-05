"use client";

import { useState } from "react";
import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { Button } from "@/components/atom/button";

interface CalendarProps {
  mode: "date" | "datetime";
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  onApply?: (date: Date | null) => void;
  onReset?: () => void;
}

export const Calendar = ({
  mode,
  selectedDate,
  onChange,
  onApply,
  onReset,
}: CalendarProps) => {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [localSelectedDate, setLocalSelectedDate] = useState<Date | null>(
    selectedDate ?? today,
  );
  const [hour, setHour] = useState(() => {
    const h = localSelectedDate?.getHours() ?? today.getHours();
    return h === 0 ? 12 : h > 12 ? h - 12 : h;
  });
  const [minute, setMinute] = useState(
    localSelectedDate?.getMinutes() ?? today.getMinutes(),
  );
  const [ampm, setAmpm] = useState(
    (localSelectedDate?.getHours() ?? today.getHours()) >= 12 ? "PM" : "AM",
  );

  // 월 이동
  const handlePrevMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(newDate);
  };

  // 날짜 클릭
  const handleDateClick = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const newDate = new Date(year, month, day);

    if (mode === "datetime") {
      newDate.setHours(ampm === "PM" ? (hour % 12) + 12 : hour % 12);
      newDate.setMinutes(minute);
    } else {
      newDate.setHours(0, 0, 0, 0);
    }
    setLocalSelectedDate(newDate);
  };

  // 초기화
  const handleReset = () => {
    setLocalSelectedDate(null);
    setCurrentMonth(today); // 오늘로 달력 초기화
    setHour(12); // 기본값
    setMinute(0);
    setAmpm("AM");

    onChange(null); // null 넘기기
    onApply?.(null); // 모달 닫히면서 null 넘기기
    onReset?.(); // 초기화할 때 상위로 알려주기
  };

  const handleHourChange = (value: number) => {
    if (!localSelectedDate) return; // null이면 그냥 리턴
    setHour(value);
    const updatedDate = new Date(localSelectedDate);
    updatedDate.setHours(ampm === "PM" ? (value % 12) + 12 : value % 12);
    setLocalSelectedDate(updatedDate);
  };

  const handleMinuteChange = (value: number) => {
    if (!localSelectedDate) return;
    setMinute(value);
    const updatedDate = new Date(localSelectedDate);
    updatedDate.setMinutes(value);
    setLocalSelectedDate(updatedDate);
  };

  const handleAmPmChange = (value: "AM" | "PM") => {
    if (!localSelectedDate) return;
    setAmpm(value);
    const updatedDate = new Date(localSelectedDate);
    const h = localSelectedDate.getHours() % 12;
    updatedDate.setHours(value === "PM" ? h + 12 : h);
    setLocalSelectedDate(updatedDate);
  };

  const startDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1,
  ).getDay();
  const lastDate = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0,
  ).getDate();

  const days = Array.from({ length: startDay + lastDate }, (_, index) => {
    const day = index - startDay + 1;
    return day > 0 ? day : null;
  });

  // 영어 월 이름 배열
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // 요일 영어 배열
  const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  console.log("selectedDate", selectedDate);
  return (
    <div>
      {/* 월 이동 */}
      <div className="flex h-8.5 items-center justify-between">
        <button onClick={handlePrevMonth} className="p-2">
          <ArrowIcon direction="left" fill="#1A1A1A" className="h-5 w-5" />
        </button>
        <span className="text-secondary-800 text-sm font-medium">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </span>
        <button onClick={handleNextMonth} className="p-2">
          <ArrowIcon direction="right" fill="#1A1A1A" className="h-5 w-5" />
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid h-8 grid-cols-7 items-center text-center text-sm font-semibold text-gray-800">
        {weekdayNames.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 text-center">
        {days.map((day, index) => (
          <div
            key={index}
            className={`flex h-8 cursor-pointer items-center justify-center ${
              day &&
              localSelectedDate &&
              day === localSelectedDate.getDate() &&
              currentMonth.getMonth() === localSelectedDate.getMonth() &&
              currentMonth.getFullYear() === localSelectedDate.getFullYear()
                ? "bg-primary-500 rounded-lg text-white"
                : ""
            }`}
            onClick={() => {
              if (day) {
                handleDateClick(day);
              }
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 시간 선택 (datetime 모드만) */}
      {mode === "datetime" && (
        <div className="mt-4 flex justify-center">
          {/* 시간 */}
          <select
            className="mr-2 rounded border px-2 py-1"
            value={hour}
            onChange={(e) => handleHourChange(parseInt(e.target.value))}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>

          {/* 분 */}
          <select
            className="mr-2 rounded border px-2 py-1"
            value={minute}
            onChange={(e) => handleMinuteChange(parseInt(e.target.value))}
          >
            {[
              "00",
              "05",
              "10",
              "15",
              "20",
              "25",
              "30",
              "35",
              "40",
              "45",
              "50",
              "55",
            ].map((m) => (
              <option key={m} value={parseInt(m)}>
                {m}
              </option>
            ))}
          </select>

          {/* AM/PM */}
          <select
            className="rounded border px-2 py-1"
            value={ampm}
            onChange={(e) => handleAmPmChange(e.target.value as "AM" | "PM")}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      )}

      {/* 버튼 */}
      {mode === "date" && (
        <div className="mt-3 flex gap-4">
          <Button
            size="md"
            variant="outline"
            className="w-full cursor-pointer"
            onClick={handleReset}
          >
            초기화
          </Button>
          <Button
            size="md"
            variant="primary"
            className="w-full cursor-pointer"
            onClick={() => {
              if (localSelectedDate) {
                onApply?.(localSelectedDate);
              }
            }}
          >
            적용
          </Button>
        </div>
      )}
    </div>
  );
};
