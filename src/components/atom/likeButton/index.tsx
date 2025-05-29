import clsx from "clsx";
import { motion } from "motion/react";
import { useState } from "react";
import { HeartIcon } from "@/components/icons/HeartIcons";
import { isLikedCheck, toggleLike } from "@/effect/like";
interface LikeButtonProps {
  gatheringId: number;
}

export const LikeButton = ({ gatheringId }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(() => isLikedCheck(gatheringId));

  // 첫 렌더링시에 isLiked가 true이면 애니메이션 동작하지 않도록 버튼 상호작용 체크
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleHeartClick = () => {
    toggleLike(gatheringId);
    setIsLiked((prev: boolean) => !prev);
    // 사용자가 최초로 버튼을 클릭한 이후만 true
    setHasInteracted(true);
  };

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
    >
      <HeartIcon fill="var(--color-secondary-200)" />

      {/* 애니메이션 용 채워지는 컬러 하트 */}
      {isLiked && (
        <motion.div
          className="absolute flex h-full w-full items-center justify-center"
          // 상호 작용이 없었다면 애니메이션 동작 X
          initial={hasInteracted ? { scale: 0 } : false}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <HeartIcon fill="var(--color-heart-primary)" />
        </motion.div>
      )}
    </button>
  );
};
