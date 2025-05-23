import { motion } from "motion/react";
import { HeartIcon } from "../../icons/HeartIcons";
interface HeartButtonProps {
  index: number;
  isActive: boolean;
  onClick: () => void;
}
// 하트 모양 버튼(1개)
const HeartButton = ({ index, isActive, onClick }: HeartButtonProps) => {
  return (
    <button
      data-testid={`HeartButton#${index + 1}`}
      onClick={onClick}
      className="relative h-6 w-6 hover:cursor-pointer focus:outline-none"
    >
      {/* 기본 회색 하트 */}
      <HeartIcon
        fill="var(--color-secondary-200)"
        className="absolute top-0 left-0"
      />

      {/* 채워지는 컬러 하트 (애니메이션 포함) */}
      {isActive && (
        <motion.div
          data-testid="heart-filled"
          className="absolute top-0 left-0 flex h-6 w-6 items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <HeartIcon
            fill="var(--color-primary-700)"
            className="absolute top-0 left-0"
          />
        </motion.div>
      )}
    </button>
  );
};

interface RatingButtonProps {
  score: number;
  setScore: (score: number) => void;
}
export const RatingButton = ({ score, setScore }: RatingButtonProps) => {
  return (
    <div className="flex w-fit">
      {Array.from({ length: 5 }, (_, index) => (
        <HeartButton
          key={index}
          index={index}
          isActive={index < score}
          onClick={() => setScore(index + 1)}
        />
      ))}
    </div>
  );
};
