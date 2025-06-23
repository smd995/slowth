"use client";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";
import { HeartIcon } from "@/components/icons/HeartIcons";
import useLikeStore from "@/stores/useLikeStore";
interface LikeButtonProps {
  gatheringId: number;
}

export const LikeButton = ({ gatheringId }: LikeButtonProps) => {
  const { toggleLike, isLikedCheck } = useLikeStore();
  const [isLiked, setIsLiked] = useState(false); // 초기값은 항상 false
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // 클라이언트에서만 실제 찜 상태를 설정
  useEffect(() => {
    setIsLiked(isLikedCheck(gatheringId));
    setIsHydrated(true);
  }, [gatheringId, isLikedCheck]);

  const handleHeartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // 카드 클릭 이벤트 막기
    toggleLike(gatheringId);
    setIsLiked(!isLiked); // 즉시 UI 업데이트
    setHasInteracted(true);
  };

  // 하이드레이션이 완료되지 않은 경우 기본 상태로 렌더링
  if (!isHydrated) {
    return (
      <button
        className="border-secondary-200 relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 bg-white"
        onClick={(e) => e.stopPropagation()}
        aria-label="모임 찜하기"
        aria-pressed={false}
        disabled
      >
        <span className="sr-only">모임 찜하기</span>
        <HeartIcon fill="var(--color-secondary-200)" />
      </button>
    );
  }

  return (
    <button
      className={clsx(
        "relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2",
        {
          "border-secondary-200 bg-white": !isLiked,
          "border-heart-base bg-heart-base": isLiked,
        },
      )}
      onClick={handleHeartClick}
      aria-label={isLiked ? "모임 찜하기 취소" : "모임 찜하기"}
      aria-pressed={isLiked}
    >
      <span className="sr-only">모임 찜하기</span>
      <HeartIcon fill="var(--color-secondary-200)" />

      {/* 애니메이션 용 채워지는 컬러 하트 */}
      <AnimatePresence>
        {isLiked && (
          <motion.div
            key="heart-filled"
            className="absolute flex h-full w-full items-center justify-center"
            // 상호 작용이 없었다면 애니메이션 동작 X
            initial={hasInteracted ? { scale: 0 } : false}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <HeartIcon fill="var(--color-heart-primary)" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};
