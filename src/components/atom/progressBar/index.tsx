import clsx from "clsx";
import { motion } from "motion/react";

interface ProgressBarProps {
  totalCount: number;
  currentCount: number;
  isColored?: boolean;
  isAnimated?: boolean;
}

export const ProgressBar = ({
  totalCount,
  currentCount,
  isColored = true,
  isAnimated = false,
}: ProgressBarProps) => {
  //퍼센트 변환
  const rawPercentage = Math.round((currentCount / totalCount) * 100);
  const percentage = Math.min(100, Math.max(0, rawPercentage));

  return (
    <div
      className={`h-1 w-full max-w-60 rounded-md ${isColored ? "bg-orange-50" : "bg-gray-200"} `}
    >
      <motion.div
        className={clsx("h-full rounded-md", {
          "bg-orange-400": isColored && totalCount === currentCount,
          "bg-orange-600": isColored && totalCount !== currentCount,
          "bg-gray-600": !isColored,
        })}
        // 초기 width: 0 & 애니메이션 시작 시 width: `${percentage}%`
        animate={{ width: `${percentage}%` }}
        // isAnimated가 true면 초기 너비를 0으로 설정하여 애니메이션 시작
        // false면 초기값 없이 바로 animate 상태로 렌더링 (애니메이션 생략)
        initial={isAnimated ? { width: 0 } : false}
        transition={{
          duration: 1.5,
          ease: "easeOut",
        }}
      />
    </div>
  );
};
