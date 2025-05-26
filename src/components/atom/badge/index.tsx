import React from "react";
import clsx from "clsx";

// 프롭스 인터페이스
interface BadgeProps {
  count: number; // 표시할 숫자 (0 이하는 렌더링하지 않음)
  active?: boolean;
}

// 뱃지 컴포넌트 정의
export const Badge = ({ count, active = false }: BadgeProps) => {
  if (count <= 0) return null;

  return (
    <span
      className={clsx(
        "inline-flex h-4 items-center justify-center rounded-full px-[7px] text-xs transition",
        active
          ? "bg-secondary-900 font-semibold text-white"
          : "group-hover:bg-secondary-900 bg-black/30 font-normal text-white group-hover:font-semibold",
      )}
    >
      {count}
    </span>
  );
};
