import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { ChevronDownIcon, ChevronUpIcon, SortIcon } from "@/components/icons/DropdownIcons";

// 리스트 옵션 타입 정의
type DropdownOption = { // 별도 상속이나 확장할 일이 거의 없기 때문에 type으로 정의
  label: string;
  value: string;
};

// 아이콘 설정 타입 정의
type IconProps = {      // 별도 상속이나 확장할 일이 거의 없기 때문에 type으로 정의
  name: "ChevronDown" | "ChevronUp" | "Sort";
  position?: "left" | "right";
};

// 프롭스 인터페이스
interface DropdownProps {
  openType: "list" | "modal";                   // 열리는 타입: 리스트 or 모달
  icon?: IconProps;                             // 아이콘 구성
  selectBehavior: "select" | "action";          // 항목 클릭 시 동작 유형
  options?: DropdownOption[];                   // 리스트 옵션 (openType === list)
  value?: string;                               // 현재 선택된 값 (select 일 때만)
  placeholder?: string;                         // 플레이스홀더 텍스트
  activeStyle?: "light" | "dark";               // 오픈 시 트리거 스타일
  onSelect: (value: string) => void;            // 항목 선택 시 콜백
  onTriggerClick?: () => void;                  // openType이 modal일 경우 실행
  size?: "sm" | "md" | "full";                  // 너비 스타일
}

// 드롭다운 컴포넌트 정의
export const Dropdown = ({
  openType,
  icon = { name: "ChevronDown", position: "right" },
  selectBehavior,
  options = [],
  value = "",
  placeholder = "",
  activeStyle = "light",
  onSelect,
  onTriggerClick,
  size = "md",
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);               // 드롭다운 열림 상태
  const triggerRef = useRef<HTMLButtonElement>(null);        // 트리거 버튼 참조
  const dropdownRef = useRef<HTMLDivElement>(null);          // 드롭다운 레이어 참조

  // 외부 클릭 시 드롭다운을 닫도록 설정
  useEffect(() => {
    // 외부 클릭 감지 핸들러 함수
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&  // 드롭다운 레이어가 열려있고
        !dropdownRef.current.contains(event.target as Node) &&  // 클릭한 대상이 드롭다운 영역 밖이며
        !triggerRef.current?.contains(event.target as Node)     // 클릭한 요소가 트리거 버튼도 아닐 때
      ) {
        setIsOpen(false); // 드롭다운 닫기
      }
    }

    document.addEventListener("mousedown", handleClickOutside); // 클릭 이벤트 리스너 추가
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);  // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, []);

  // 현재 선택된 라벨 반환(트리에 표시할 텍스트)
  const selectedLabel =
  selectBehavior === "select"
    ? // select 모드일 경우: value와 일치하는 label 반환 -> 없으면 placeholder
      options.find((opt) => opt.value === value)?.label || placeholder
    : // action 모드일 경우: 항상 placeholder만 보여줌
      placeholder;

  // 너비 클래스 설정
  const sizeClass = {
    sm: "w-10",
    md: "w-20",
    full: "w-full",
  }[size];

  // 트리거 버튼 클릭 시 로직
  const handleTriggerClick = () => {
    if (openType === "modal") { // 모달 타입일 경우 : 외부 모달 호출
      onTriggerClick?.();
    } else {                    // 리스트 타입일 경우 : 드롭다운 열기/닫기
      setIsOpen(!isOpen);
    }
  };

  // 트리거 내 아이콘 설정
  const iconMap = {
    ChevronDown: <ChevronDownIcon fill={isOpen ? "#ffffff" : "#1F2937"} className="w-4 h-4" />,
    ChevronUp: <ChevronUpIcon fill={isOpen ? "#ffffff" : "#1F2937"} className="w-4 h-4" />,
    Sort: <SortIcon fill={isOpen ? "#ffffff" : "#1F2937"} className="w-4 h-4" />,
  } as const;

  return (
    <div className="relative inline-block text-left">
      {/* 트리거 버튼 (드롭다운을 여는 버튼) */}
      <button
        ref={triggerRef}
        onClick={handleTriggerClick}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={clsx(
          "flex items-center justify-between rounded-xl px-3 py-2 text-sm border",
          sizeClass,
          {
            // 비활성(닫힌) 상태일 때: 라이트 스타일
            "bg-white text-gray-900 border-gray-300": activeStyle === "light" && !isOpen,
            // 활성(열림) 상태일 때: 다크 스타일
            "bg-gray-800 text-white": activeStyle === "dark" && isOpen,
          }
        )}
      >
        {/* 아이콘 - 왼쪽 위치일 경우 렌더링 */}
        {icon?.position === "left" && iconMap[icon.name] && (
          <span className="mr-2">{iconMap[icon.name]}</span>
        )}

        {/* 현재 선택된 값 or 플레이스홀더 */}
        <span className="truncate">{selectedLabel}</span>

        {/* 아이콘 - 오른쪽 위치일 경우 렌더링 */}
        {icon?.position !== "left" && iconMap[icon.name] && (
          <span className="ml-2">{iconMap[icon.name]}</span>
        )}
      </button>

      {/* 드롭다운 리스트 */}
      {openType === "list" && isOpen && (
        <div
          ref={dropdownRef}
          className={clsx(
            "absolute z-10 mt-2 w-full rounded-xl bg-white shadow-xl overflow-hidden",
            sizeClass
          )}
        >
          {options.map((option) => (
            <button
              key={option.value}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              className={clsx(
                "w-full text-left px-3 py-2 text-sm text-gray-800 hover:bg-gray-100",
                {
                  "bg-orange-50 text-orange-800": value === option.value, // 선택된 항목 강조
                }
              )}
              onClick={() => {
                onSelect(option.value); // 선택 이벤트 전달
                if (selectBehavior === "select") {
                  setIsOpen(false); // select 타입일 경우 리스트 닫기
                }
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};