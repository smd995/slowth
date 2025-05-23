import React from "react";
import clsx from "clsx";

// 프롭스 인터페이스
interface BadgeProps {
  count: number; // 표시할 숫자 (0 이하는 렌더링하지 않음)
}

// 뱃지 컴포넌트 정의
export const Badge = ({ count }: BadgeProps) => {
  if (count <= 0) return null;

  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center",
        "bg-secondary-900 text-xs font-semibold text-white",
        "h-4 rounded-full px-[7px]",
      )}
    >
      {count}
    </span>
  );
};
