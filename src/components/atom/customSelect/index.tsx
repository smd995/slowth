"use client";

import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label?: string;
  error?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  name?: string;
  id?: string;
  placeholder?: string;
  options: Option[];
  disabled?: boolean;
}

export const CustomSelect = ({
  label,
  error,
  className,
  value = "",
  onChange,
  onBlur,
  name,
  id,
  placeholder = "선택해주세요",
  options,
  disabled = false,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const selectRef = useRef<HTMLDivElement>(null);

  // 선택된 옵션 찾기
  const selectedOption = options.find(
    (option) => option.value === selectedValue,
  );

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
  }, [value]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (optionValue: string) => {
    setSelectedValue(optionValue);
    setIsOpen(false);

    // react-hook-form 호환성을 위한 이벤트 형식 지원
    if (onChange) {
      onChange(optionValue);
    }

    // onBlur 처리
    if (onBlur) {
      onBlur();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        setIsOpen(!isOpen);
        break;
      case "Escape":
        setIsOpen(false);
        break;
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          // 다음 옵션으로 이동 로직
          const currentIndex = options.findIndex(
            (opt) => opt.value === selectedValue,
          );
          const nextIndex = Math.min(currentIndex + 1, options.length - 1);
          handleOptionClick(options[nextIndex].value);
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (isOpen) {
          const currentIndex = options.findIndex(
            (opt) => opt.value === selectedValue,
          );
          const prevIndex = Math.max(currentIndex - 1, 0);
          handleOptionClick(options[prevIndex].value);
        }
        break;
    }
  };

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

        {/* Custom Select Button */}
        <button
          type="button"
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
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
          <span
            className={clsx(
              selectedOption ? "text-secondary-900" : "text-secondary-400",
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>

          <ChevronDown
            className={clsx(
              "text-secondary-500 h-5 w-5 transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        </button>

        {/* Dropdown Options */}
        {isOpen && (
          <div
            className={clsx(
              "absolute top-full right-0 left-0 z-50 mt-1",
              "border-secondary-200 rounded-xl border bg-white shadow-lg",
              "animate-in fade-in-0 zoom-in-95 duration-200",
            )}
          >
            <div className="max-h-60 overflow-y-auto py-1">
              {options.map((option, index) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleOptionClick(option.value)}
                  className={clsx(
                    "w-full px-4 py-2.5 text-left transition-colors duration-150",
                    "hover:bg-primary-50 focus:bg-primary-50 focus:outline-none",
                    selectedValue === option.value &&
                      "bg-primary-100 text-primary-900 font-medium",
                    index === 0 && "rounded-t-xl",
                    index === options.length - 1 && "rounded-b-xl",
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      <div className="min-h-5">
        {error && (
          <p className="flex items-center gap-1 text-sm text-red-600">
            <span>⚠️</span>
            {error}
          </p>
        )}
      </div>
    </div>
  );
};
