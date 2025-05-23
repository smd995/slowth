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
  direction?: "up" | "down" | "left" | "right";   // arrow일 경우만 적용
  position?: "left" | "right";
};

// 프롭스 인터페이스
interface DropdownProps {
  openType: "list" | "modal";                   // 열리는 타입: 리스트 or 모달
  icon?: IconProps;                             // 아이콘 구성 (arrow, sort 등)
  selectBehavior: "select" | "action";          // 항목 클릭 시 동작 유형 (select, action)
  options?: DropdownOption[];                   // 리스트 옵션 (openType === list)
  value?: string;                               // 현재 선택된 값 (select 일 때만)
  placeholder?: string;                         // 플레이스홀더 텍스트
  activeStyle?: "light" | "dark";               // 오픈 시 트리거 스타일 (라이트 or 다크)
  onSelect: (value: string) => void;            // 항목 선택 시 콜백
  onTriggerClick?: () => void;                  // openType이 modal일 경우 실행
  size?: "sm" | "md" | "lg" | "full";           // 드롭다운 너비 설정
  children?: React.ReactNode;                   // 커스텀 트리거 요소
}

// 드롭다운 컴포넌트 정의
export const Dropdown = ({
  openType,
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
}: DropdownProps) => {
  
  // 1. State
  const [isOpen, setIsOpen] = useState(false);                            // 드롭다운 열림 상태

  // 2. Refs
  const triggerRef = useRef<HTMLButtonElement | HTMLDivElement>(null);    // 트리거 버튼 참조
  const dropdownRef = useRef<HTMLDivElement>(null);                       // 드롭다운 레이어 참조
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);  // 호버 타이머 참조

  // 3. Derived values
  const selectedOption = options.find((opt) => opt.value === value);
  const isPlaceholder = !selectedOption;
  const selectedLabel =
    selectBehavior === "select"
      ? selectedOption?.label || placeholder
      : placeholder;
  
  const sizeClass = {   // 드롭다운 너비 설정
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
        !dropdownRef.current.contains(event.target as Node) &&  // 클릭한 대상이 드롭다운 영역 밖이며
        !triggerRef.current?.contains(event.target as Node)     // 클릭한 요소가 트리거 버튼도 아닐 때
      ) {
        setIsOpen(false); // 드롭다운 닫기
      }
    };
    document.addEventListener("mousedown", handleClickOutside); // 클릭 이벤트 리스너 추가
    return () => document.removeEventListener("mousedown", handleClickOutside); // 컴포넌트 언마운트 시 이벤트 리스너 제거
  }, []);

  // 5. Event handlers
  const handleTriggerClick = () => {
    if (openType === "modal") onTriggerClick?.();
    else setIsOpen(!isOpen);
  };
  const handleMouseEnter = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setIsOpen(true);
  };
  const handleMouseLeave = () => {
    hoverTimer.current = setTimeout(() => setIsOpen(false), 200); // 200ms 후 닫힘
  };

  // 6. Icon 렌더링 함수
  const renderIcon = () => {
    if (!icon) return null;
    const fill =
      icon.name === "sort"
        ? "var(--color-secondary-800)"
        : activeStyle === "light"
        ? "var(--color-secondary-800)"
        : isOpen
        ? "var(--color-white)"
        : "var(--color-secondary-800)";
    const iconSizeClass = icon.name === "sort" ? "w-4 h-4" : "w-6 h-6"; // sort는 16px, 나머지는 24px
    if (icon.name === "arrow") {
      const direction = icon.direction ?? (isOpen ? "up" : "down");     // 오픈: up, 닫힘: down
      return <ArrowIcon direction={direction} fill={fill} className={iconSizeClass} />;
    }
    if (icon.name === "sort") {
      return <SortIcon fill={fill} className={iconSizeClass} />;
    }
    return null;
  };

  // 7. Return JSX
  return (
    <div
      className={clsx("relative", size === "full" ? "w-full block" : "inline-block", "text-left")}
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
          onClick={handleTriggerClick}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={clsx(
            "flex items-center rounded-xl px-3 py-2 text-sm cursor-pointer",
            sizeClass,
            { 
              // 높이 설정
              "h-10": size !== "full",
              "h-11": size === "full",

              // 정렬 방식 (아이콘 유무에 따라)
              "justify-between": !!icon && icon.name !== "sort",

              // light + full + placeholder 상태 (초기 렌더링)
              "bg-secondary-50 text-secondary-400 border border-secondary-50":
                activeStyle === "light" && size === "full" && !isOpen && isPlaceholder,

              // light + full + 선택된 상태 or 열림 상태 (항상 같은 배경 유지)
              "bg-secondary-50 text-secondary-800 border-0":
                activeStyle === "light" && size === "full" && (!isPlaceholder || isOpen),

              // 일반 light 스타일 (full 제외)
              "bg-white text-secondary-800 border-2 border-secondary-100":
                activeStyle === "light" && size !== "full" && (!isPlaceholder || isOpen),

              // dark 스타일 - 닫힘
              "border-2 border-secondary-100":
                activeStyle === "dark" && !isOpen,

              // dark 스타일 - 열림
              "bg-secondary-800 text-white":
                activeStyle === "dark" && isOpen && icon?.name !== "sort",

              // dark + sort 아이콘 (열림 시 텍스트 유지)
              "text-secondary-800":
                isOpen && activeStyle === "dark" && icon?.name === "sort",
            },
            "focus:outline-none focus:ring-0"
          )}
        >
          {icon?.position === "left" && <span className="mr-2">{renderIcon()}</span>}
          <span className="truncate">{selectedLabel}</span>
          {icon?.position !== "left" && <span className="ml-2">{renderIcon()}</span>}
        </button>
      )}

      {/* 드롭다운 리스트 */}
      {openType === "list" && isOpen && (
        <div
          ref={dropdownRef}
          className={clsx(
            "absolute z-10 mt-2 w-full rounded-xl bg-white shadow-xl overflow-hidden",
            sizeClass
          )}
        >
          {options.map((option) => {
            const isSelected = value === option.value;
            return (
              <button
                key={option.value}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                className={clsx(
                  "w-full text-left text-sm text-secondary-800 hover:bg-secondary-100 cursor-pointer h-10",
                  isSelected ? "p-1 bg-transparent" : "px-3 py-2"
                )}
                onClick={() => {
                  onSelect(option.value);
                  if (selectBehavior === "select") {
                    setIsOpen(false);
                  }
                }}
              >
                <div
                  className={clsx(
                    isSelected
                      ? "bg-primary-50 text-primary-800 rounded-xl p-1.5 truncate"
                      : ""
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