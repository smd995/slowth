import clsx from "clsx";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { HeartIcon } from "@/components/icons/HeartIcons";
interface LikeButtonProps {
  isLiked: boolean;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LikeButton = ({ isLiked, setIsLiked }: LikeButtonProps) => {
  // 첫 렌더링시에 isLiked가 true이면 애니메이션 동작하지 않도록 버튼 상호작용 체크
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // 사용자가 최초로 버튼을 클릭한 이후만 true
    if (!hasInteracted && isLiked === false) return;
    setHasInteracted(true);
  }, [isLiked]);

  return (
    <button
      className={clsx(
        "relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2",
        {
          "border-secondary-200 bg-white": !isLiked,
          "border-primary-50 bg-primary-50": isLiked,
        },
      )}
      onClick={() => setIsLiked((prev) => !prev)}
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
          <HeartIcon fill="var(--color-primary-700)" />
        </motion.div>
      )}
    </button>
  );
};
