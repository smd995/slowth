import React from "react";
import clsx from "clsx";

// 프롭스 인터페이스
interface ChipProps {
  label: string; // Chip에 표시될 텍스트
  selected: boolean; // 선택 상태 여부 (true: 선택됨, false: 미선택)
  onClick: () => void; // 클릭 시 실행할 함수
}

// 칩 컴포넌트 정의
export const Chip = ({ label, selected, onClick }: ChipProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "cursor-pointer rounded-xl transition",
        "px-3 py-2 text-sm", // 모바일 기본
        "sm:px-4 sm:py-[10px]", // 태블릿 이상
        selected
          ? "bg-gray-900 text-white" // 선택됨: 어두운 배경 + 흰 글씨
          : "bg-gray-200 text-gray-900", // 미선택: 밝은 배경 + 어두운 글씨
      )}
      role="button"
    >
      {label}
    </button>
  );
};
