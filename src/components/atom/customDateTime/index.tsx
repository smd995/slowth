"use client";

import clsx from "clsx";
import { ChevronDown, Calendar, Clock } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";

interface CustomDateTimeProps {
  label?: string;
  error?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  name?: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: "datetime-local" | "date" | "time";
  align?: "left" | "right";
}

export const CustomDateTime = ({
  label,
  error,
  className,
  value = "",
  onChange,
  onBlur,
  name,
  id,
  placeholder = "날짜와 시간을 선택해주세요",
  disabled = false,
  type = "datetime-local",
  align = "left",
}: CustomDateTimeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedHour, setSelectedHour] = useState(9);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const selectRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        onBlur?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onBlur]);

  // value prop 변경 시 동기화
  useEffect(() => {
    setSelectedValue(value);
    if (value) {
      const date = dayjs(value);
      setCurrentDate(date);
      setSelectedHour(date.hour());
      setSelectedMinute(date.minute());
    }
  }, [value]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const formatDisplayValue = (dateStr: string) => {
    if (!dateStr) return "";
    const date = dayjs(dateStr);

    if (type === "date") {
      return date.format("YYYY-MM-DD");
    } else if (type === "time") {
      return date.format("HH:mm");
    } else {
      return date.format("YYYY-MM-DD HH:mm");
    }
  };

  const updateDateTime = (date?: Dayjs, hour?: number, minute?: number) => {
    const newDate = date || currentDate;
    const newHour = hour !== undefined ? hour : selectedHour;
    const newMinute = minute !== undefined ? minute : selectedMinute;

    const updatedDateTime = newDate.hour(newHour).minute(newMinute);
    const dateTimeString = updatedDateTime.format("YYYY-MM-DDTHH:mm");

    setSelectedValue(dateTimeString);
    onChange?.(dateTimeString);

    return updatedDateTime;
  };

  const handleDateSelect = (date: Dayjs) => {
    setCurrentDate(date);
    updateDateTime(date);

    if (type === "date") {
      setIsOpen(false);
    }
  };

  const handleHourChange = (hour: number) => {
    setSelectedHour(hour);
    updateDateTime(undefined, hour, undefined);
  };

  const handleMinuteChange = (minute: number) => {
    setSelectedMinute(minute);
    updateDateTime(undefined, undefined, minute);

    // 분 선택하면 완료로 간주하고 닫기
    setTimeout(() => setIsOpen(false), 200);
  };

  // 캘린더 생성 함수
  const generateCalendar = (date: Dayjs) => {
    const startOfMonth = date.startOf("month");
    const endOfMonth = date.endOf("month");
    const startDate = startOfMonth.startOf("week");
    const endDate = endOfMonth.endOf("week");

    const calendar = [];
    let current = startDate;

    while (current.isBefore(endDate) || current.isSame(endDate, "day")) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        week.push(current);
        current = current.add(1, "day");
      }
      calendar.push(week);
    }

    return calendar;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentDate(currentDate.subtract(1, "month"));
    } else {
      setCurrentDate(currentDate.add(1, "month"));
    }
  };

  // 시간과 분 옵션 생성
  const hourOptions = Array.from({ length: 24 }, (_, i) => i);
  const minuteOptions = Array.from({ length: 60 }, (_, i) => i);

  const calendar = generateCalendar(currentDate);
  const today = dayjs();
  const monthNames = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      {label && (
        <label htmlFor={id || name} className="font-semibold">
          {label}
        </label>
      )}

      <div className="relative" ref={selectRef}>
        {/* Hidden input for form compatibility */}
        <input type="hidden" name={name} id={id} value={selectedValue} />

        {/* Custom DateTime Button */}
        <button
          type="button"
          onClick={handleToggle}
          disabled={disabled}
          className={clsx(
            "bg-secondary-50 flex h-10 w-full items-center justify-between rounded-xl px-4 py-2.5 text-left transition-all duration-200 outline-none sm:h-11",
            error
              ? "focus:ring-opacity-50 border-2 border-red-500 focus:ring-2 focus:ring-red-500"
              : "border-secondary-500 focus:ring-primary-500 focus:ring-opacity-50 border focus:ring-2",
            disabled && "cursor-not-allowed opacity-50",
            isOpen &&
              !error &&
              "ring-primary-500 ring-opacity-50 border-primary-500 ring-2",
          )}
        >
          <div className="flex items-center gap-2">
            <span
              className={clsx(
                selectedValue ? "text-secondary-900" : "text-secondary-400",
              )}
            >
              {selectedValue ? formatDisplayValue(selectedValue) : placeholder}
            </span>
          </div>

          {type === "time" ? (
            <Clock className="text-secondary-500 h-4 w-4" />
          ) : (
            <Calendar className="text-secondary-500 h-4 w-4" />
          )}
        </button>

        {/* DateTime Picker Dropdown */}
        {isOpen && (
          <div
            className={clsx(
              "absolute bottom-full z-50 mb-1",
              "border-secondary-200 rounded-xl border bg-white shadow-lg",
              "animate-in fade-in-0 zoom-in-95 duration-200",
              "p-3 lg:p-4",
              // 반응형 크기와 위치 - align prop에 따른 정렬
              type === "datetime-local"
                ? `w-[270px] max-w-[calc(100vw-1rem)] lg:w-[480px] ${align === "right" ? "right-0" : "left-0"}`
                : `w-64 max-w-[calc(100vw-1rem)] lg:w-80 ${align === "right" ? "right-0" : "left-0"}`,
            )}
          >
            {/* datetime-local일 때 좌우 배치 */}
            {type === "datetime-local" && (
              <div className="flex flex-col gap-3 lg:flex-row lg:gap-6">
                {/* 캘린더 */}
                <div className="min-w-0 flex-1">
                  {/* 월 네비게이션 */}
                  <div className="mb-3 flex items-center justify-between lg:mb-4">
                    <button
                      type="button"
                      onClick={() => navigateMonth("prev")}
                      className="hover:bg-secondary-100 rounded p-1"
                    >
                      <ChevronDown className="h-4 w-4 rotate-90" />
                    </button>
                    <h3 className="font-semibold">
                      {currentDate.year()}년 {monthNames[currentDate.month()]}
                    </h3>
                    <button
                      type="button"
                      onClick={() => navigateMonth("next")}
                      className="hover:bg-secondary-100 rounded p-1"
                    >
                      <ChevronDown className="h-4 w-4 -rotate-90" />
                    </button>
                  </div>

                  {/* 요일 헤더 */}
                  <div className="mb-2 grid grid-cols-7 gap-1">
                    {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                      <div
                        key={day}
                        className="text-secondary-600 py-2 text-center text-sm font-medium"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* 캘린더 그리드 */}
                  <div className="grid grid-cols-7 gap-1">
                    {calendar.map((week, weekIndex) =>
                      week.map((date, dayIndex) => {
                        const isCurrentMonth =
                          date.month() === currentDate.month();
                        const isToday = date.isSame(today, "day");
                        const isSelected =
                          selectedValue &&
                          dayjs(selectedValue).isSame(date, "day");

                        return (
                          <button
                            key={`${weekIndex}-${dayIndex}`}
                            type="button"
                            onClick={() => handleDateSelect(date)}
                            className={clsx(
                              "h-8 w-8 rounded-lg text-sm transition-colors",
                              isCurrentMonth
                                ? "text-secondary-900"
                                : "text-secondary-400",
                              isToday &&
                                "bg-primary-100 text-primary-900 font-semibold",
                              isSelected &&
                                "bg-primary-600 font-semibold text-white",
                              !isSelected &&
                                !isToday &&
                                isCurrentMonth &&
                                "hover:bg-secondary-100",
                            )}
                          >
                            {date.date()}
                          </button>
                        );
                      }),
                    )}
                  </div>
                </div>

                {/* 시간 선택 */}
                <div className="w-full min-w-0 lg:w-48">
                  <h4 className="mb-2 font-medium lg:mb-3">시간 선택</h4>
                  <div className="flex gap-2 lg:gap-3">
                    {/* 시간 선택 */}
                    <div className="flex-1">
                      <label className="text-secondary-600 mb-1.5 block text-sm lg:mb-2">
                        시간
                      </label>
                      <div className="border-secondary-200 max-h-28 overflow-y-auto rounded-lg border lg:max-h-32">
                        {hourOptions.map((hour) => (
                          <button
                            key={hour}
                            type="button"
                            onClick={() => handleHourChange(hour)}
                            className={clsx(
                              "w-full px-2 py-1.5 text-center text-sm transition-colors",
                              selectedHour === hour
                                ? "bg-primary-100 text-primary-900 font-medium"
                                : "hover:bg-secondary-50",
                            )}
                          >
                            {hour.toString().padStart(2, "0")}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 분 선택 */}
                    <div className="flex-1">
                      <label className="text-secondary-600 mb-1.5 block text-sm lg:mb-2">
                        분
                      </label>
                      <div className="border-secondary-200 max-h-28 overflow-y-auto rounded-lg border lg:max-h-32">
                        {minuteOptions.map((minute) => (
                          <button
                            key={minute}
                            type="button"
                            onClick={() => handleMinuteChange(minute)}
                            className={clsx(
                              "w-full px-2 py-1.5 text-center text-sm transition-colors",
                              selectedMinute === minute
                                ? "bg-primary-100 text-primary-900 font-medium"
                                : "hover:bg-secondary-50",
                            )}
                          >
                            {minute.toString().padStart(2, "0")}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* date 타입일 때 캘린더만 */}
            {type === "date" && (
              <div>
                {/* 월 네비게이션 */}
                <div className="mb-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => navigateMonth("prev")}
                    className="hover:bg-secondary-100 rounded p-1"
                  >
                    <ChevronDown className="h-4 w-4 rotate-90" />
                  </button>
                  <h3 className="font-semibold">
                    {currentDate.year()}년 {monthNames[currentDate.month()]}
                  </h3>
                  <button
                    type="button"
                    onClick={() => navigateMonth("next")}
                    className="hover:bg-secondary-100 rounded p-1"
                  >
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </button>
                </div>

                {/* 요일 헤더 */}
                <div className="mb-2 grid grid-cols-7 gap-1">
                  {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                    <div
                      key={day}
                      className="text-secondary-600 py-2 text-center text-sm font-medium"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* 캘린더 그리드 */}
                <div className="grid grid-cols-7 gap-1">
                  {calendar.map((week, weekIndex) =>
                    week.map((date, dayIndex) => {
                      const isCurrentMonth =
                        date.month() === currentDate.month();
                      const isToday = date.isSame(today, "day");
                      const isSelected =
                        selectedValue &&
                        dayjs(selectedValue).isSame(date, "day");

                      return (
                        <button
                          key={`${weekIndex}-${dayIndex}`}
                          type="button"
                          onClick={() => handleDateSelect(date)}
                          className={clsx(
                            "h-8 w-8 rounded-lg text-sm transition-colors",
                            isCurrentMonth
                              ? "text-secondary-900"
                              : "text-secondary-400",
                            isToday &&
                              "bg-primary-100 text-primary-900 font-semibold",
                            isSelected &&
                              "bg-primary-600 font-semibold text-white",
                            !isSelected &&
                              !isToday &&
                              isCurrentMonth &&
                              "hover:bg-secondary-100",
                          )}
                        >
                          {date.date()}
                        </button>
                      );
                    }),
                  )}
                </div>
              </div>
            )}

            {/* time 타입일 때 시간 선택만 */}
            {type === "time" && (
              <div>
                <h4 className="mb-3 font-medium">시간 선택</h4>
                <div className="flex gap-4">
                  {/* 시간 선택 */}
                  <div className="flex-1">
                    <label className="text-secondary-600 mb-2 block text-sm">
                      시간
                    </label>
                    <div className="border-secondary-200 max-h-32 overflow-y-auto rounded-lg border">
                      {hourOptions.map((hour) => (
                        <button
                          key={hour}
                          type="button"
                          onClick={() => handleHourChange(hour)}
                          className={clsx(
                            "w-full px-3 py-2 text-center text-sm transition-colors",
                            selectedHour === hour
                              ? "bg-primary-100 text-primary-900 font-medium"
                              : "hover:bg-secondary-50",
                          )}
                        >
                          {hour.toString().padStart(2, "0")}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 분 선택 */}
                  <div className="flex-1">
                    <label className="text-secondary-600 mb-2 block text-sm">
                      분
                    </label>
                    <div className="border-secondary-200 max-h-32 overflow-y-auto rounded-lg border">
                      {minuteOptions.map((minute) => (
                        <button
                          key={minute}
                          type="button"
                          onClick={() => handleMinuteChange(minute)}
                          className={clsx(
                            "w-full px-3 py-2 text-center text-sm transition-colors",
                            selectedMinute === minute
                              ? "bg-primary-100 text-primary-900 font-medium"
                              : "hover:bg-secondary-50",
                          )}
                        >
                          {minute.toString().padStart(2, "0")}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
