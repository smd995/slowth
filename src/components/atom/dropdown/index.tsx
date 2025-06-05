import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { SortIcon } from "@/components/icons/DropdownIcons";

// 리스트 옵션 타입 정의
type DropdownOption = {
  label: string;
  value: string;
};

// 아이콘 설정 타입 정의
type IconProps = {
  name: "arrow" | "sort";
  direction?: "up" | "down" | "left" | "right"; // arrow일 경우만 적용
  position?: "left" | "right";
};

// 프롭스 인터페이스
interface DropdownProps {
  icon?: IconProps; // 아이콘 구성 (arrow, sort 등)
  selectBehavior: "select" | "action"; // 항목 클릭 시 동작 유형 (select, action)
  options?: DropdownOption[]; // 리스트 옵션 (openType === list)
  value?: string; // 현재 선택된 값 (select 일 때만)ㄹ
  placeholder?: string; // 플레이스홀더 텍스트
  activeStyle?: "light" | "dark"; // 오픈 시 트리거 스타일 (라이트 or 다크)
  onSelect: (value: string) => void; // 항목 선택 시 콜백
  onTriggerClick?: () => void; // openType이 modal일 경우 실행
  size?: "sm" | "md" | "lg" | "full"; // 드롭다운 너비 설정
  children?: React.ReactNode; // 커스텀 트리거 요소
  customListClassName?: string; // 드롭다운 리스트에 적용할 추가 클래스
  isOpen?: boolean; // 드롭다운 열림 상태 (외부에서 제어 가능)
}

// 드롭다운 컴포넌트 정의
export const Dropdown = ({
  icon,
  selectBehavior,
  options = [],
  value = "",
  placeholder = "",
  activeStyle = "light",
  onSelect,
  onTriggerClick,
  size = "md",
  children,
  customListClassName,
  isOpen: externalIsOpen,
}: DropdownProps) => {
  // 1. State
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const computedIsOpen =
    selectBehavior === "action"
      ? externalIsOpen || internalIsOpen
      : internalIsOpen;

  // 2. Refs
  const triggerRef = useRef<HTMLButtonElement | HTMLDivElement>(null); // 트리거 버튼 참조
  const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운 레이어 참조
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null); // 호버 타이머 참조

  // 3. Derived values
  const selectedOption = options.find((opt) => opt.value === value);
  const isPlaceholder = !selectedOption;
  const selectedLabel =
    selectBehavior === "select"
      ? selectedOption?.label || placeholder
      : placeholder;

  const triggerSizeClass = {
    sm: "min-w-0",
    md: "sm:min-w-[110px]",
    lg: "sm:min-w-[142px]",
    full: "w-full",
  }[size];

  const dropdownListSizeClass = {
    sm: "min-w-[80px]",
    md: "min-w-[110px]",
    lg: "min-w-[142px]",
    full: "w-full",
  }[size];

  // 4. Side effects
  useEffect(() => {
    // 외부 클릭 감지 핸들러 함수
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) && // 클릭한 대상이 드롭다운 영역 밖이며
        !triggerRef.current?.contains(event.target as Node) // 클릭한 요소가 트리거 버튼도 아닐 때
      ) {
        if (selectBehavior === "select") {
          setInternalIsOpen(false); // select 모드일 때만 닫기
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside); // 클릭 이벤트 리스너 추가
    return () => document.removeEventListener("mousedown", handleClickOutside); // 컴포넌트 언마운트 시 이벤트 리스너 제거
  }, [selectBehavior]);

  // 5. Event handlers
  const handleTriggerClick = () => {
    if (selectBehavior === "action") {
      onTriggerClick?.(); // "action" 모드일 때는 외부 핸들러 호출 (캘린더 열기)
    } else {
      setInternalIsOpen((prev) => !prev); // "select" 모드일 때는 내부 드롭다운 열기
    }
  };
  const handleMouseEnter = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setInternalIsOpen(true);
  };
  const handleMouseLeave = () => {
    hoverTimer.current = setTimeout(() => setInternalIsOpen(false), 200); // 200ms 후 닫힘
  };

  // 6. Icon 렌더링 함수
  const renderIcon = () => {
    if (!icon) return null;
    const isDarkBackground = computedIsOpen ? true : activeStyle === "dark";
    const fill =
      icon.name === "sort"
        ? "var(--color-secondary-800)"
        : isDarkBackground
          ? "var(--color-white)"
          : "var(--color-secondary-800)";
    const iconSizeClass = icon.name === "sort" ? "w-4 h-4" : "w-6 h-6"; // sort는 16px, 나머지는 24px
    if (icon.name === "arrow") {
      const direction = icon.direction ?? (computedIsOpen ? "up" : "down"); // 오픈: up, 닫힘: down
      return (
        <ArrowIcon
          direction={direction}
          fill={fill}
          className={iconSizeClass}
        />
      );
    }
    if (icon.name === "sort") {
      return <SortIcon fill={fill} className={iconSizeClass} />;
    }
    return null;
  };

  // 7. Styling 분기
  const baseClass =
    "flex cursor-pointer items-center rounded-xl px-3 py-2 text-sm";
  const heightClass = size !== "full" ? "h-10" : "h-11";
  const justifyClass = !!icon && icon.name !== "sort" ? "justify-between" : "";
  const isFullLight = size === "full" && activeStyle === "light";
  const isDarkMode =
    "bg-secondary-800 border-secondary-800 border-2 text-white";
  const isLightBgDarkFt = "bg-secondary-50 text-secondary-800 border-0";

  let stateClass = "";

  if (isFullLight) {
    if (isPlaceholder && !computedIsOpen) {
      stateClass =
        "bg-secondary-50 text-secondary-400 border-secondary-50 border";
    } else {
      stateClass = isLightBgDarkFt;
    }
  } else if (computedIsOpen && icon?.name === "arrow") {
    stateClass = isDarkMode;
  } else {
    if (activeStyle === "dark") {
      stateClass = isDarkMode;
    } else {
      if (size === "full") {
        stateClass = isPlaceholder
          ? "bg-secondary-50 text-secondary-400 border-secondary-50 border"
          : isLightBgDarkFt;
      } else {
        stateClass =
          "text-secondary-800 border-secondary-100 border-2 bg-white";
      }
    }
  }

  // 8. Return JSX
  return (
    <div
      className={clsx(
        "relative",
        size === "full" ? "block w-full" : "inline-block",
        "text-left",
      )}
      onMouseEnter={children ? handleMouseEnter : undefined}
      onMouseLeave={children ? handleMouseLeave : undefined}
    >
      {/* 트리거 버튼 (드롭다운을 여는 버튼) */}
      {children ? (
        <div
          ref={triggerRef as React.RefObject<HTMLDivElement>}
          className="cursor-pointer"
        >
          {children}
        </div>
      ) : (
        <button
          ref={triggerRef as React.RefObject<HTMLButtonElement>}
          onMouseDown={handleTriggerClick}
          aria-haspopup="listbox"
          aria-expanded={computedIsOpen}
          className={clsx(
            baseClass, // 버튼 기본 스타일 (flex, padding, 텍스트 크기, radius)
            triggerSizeClass, // 사이즈별 min-width 설정 (sm, md, lg, full)
            heightClass, // 사이즈에 따른 버튼 height 설정 (h-10 or h-11)
            justifyClass, // 아이콘 있으면 양끝 정렬 (justify-between)
            stateClass, // 현재 상태에 따른 배경색/테두리색/텍스트색
            "focus:ring-0 focus:outline-none", // 포커스 효과 제거 (focus시 테두리 없앰)
          )}
        >
          {icon?.position === "left" && (
            <span className="sm:mr-2">{renderIcon()}</span>
          )}
          <span
            className={clsx(
              "truncate",
              icon?.position === "left"
                ? "hidden sm:inline-block"
                : "inline-block",
            )}
          >
            {selectedLabel}
          </span>
          {icon?.position !== "left" && (
            <span className="ml-2">{renderIcon()}</span>
          )}
        </button>
      )}

      {/* 드롭다운 리스트 */}
      {computedIsOpen && (
        <div
          ref={dropdownRef}
          className={clsx(
            "absolute z-10 mt-2 w-full overflow-hidden rounded-xl bg-white shadow-xl",
            dropdownListSizeClass,
            customListClassName,
          )}
        >
          {options.map((option) => {
            const isSelected = value === option.value;
            return (
              <button
                key={option.value}
                aria-haspopup="listbox"
                aria-expanded={computedIsOpen}
                className={clsx(
                  "text-secondary-800 hover:bg-secondary-100 h-10 w-full cursor-pointer text-left text-sm",
                  isSelected ? "bg-transparent p-1" : "px-3 py-2",
                )}
                onClick={() => {
                  onSelect(option.value);
                  if (selectBehavior === "select") {
                    setInternalIsOpen(false);
                  }
                }}
              >
                <div
                  className={clsx(
                    isSelected
                      ? "bg-primary-50 text-primary-800 truncate rounded-xl p-1.5"
                      : "",
                  )}
                >
                  {option.label}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
