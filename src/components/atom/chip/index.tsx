import React from "react";
import clsx from "clsx";

// 프롭스 인터페이스
interface ChipProps {
  label: string;              // Chip에 표시될 텍스트
  selected: boolean;          // 선택 상태 여부 (true: 선택됨, false: 미선택)
  onClick: () => void;        // 클릭 시 실행할 함수
  size?: "sm" | "md";         // 크기 옵션 (기본값은 "md")
}

// 칩 컴포넌트 정의
export const Chip = ({ label, selected, onClick, size = "md" }: ChipProps) => {
  const sizeClass = {
    sm: "px-3 py-2 text-sm",        // 좌우 12px, 상하 8px, 폰트 14px
    md: "px-4 py-[10px] text-sm",   // 좌우 16px, 상하 10px, 폰트 14px
  }[size];

  return (
    <button
      onClick={onClick}
      className={clsx(
        "rounded-xl cursor-pointer transition",
        sizeClass,
        selected
          ? "bg-gray-900 text-white"      // 선택됨: 어두운 배경 + 흰 글씨
          : "bg-gray-200 text-gray-900"   // 미선택: 밝은 배경 + 어두운 글씨
      )}
      role="button"
    >
      {label}
    </button>
  );
};