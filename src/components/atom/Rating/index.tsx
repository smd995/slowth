import { HeartIcon } from "@/components/icons/HeartIcons";

interface RatingProps {
  score: number;
}

export const Rating = ({ score }: RatingProps) => {
  return (
    <div className="flex w-fit">
      {Array.from({ length: 5 }, (_, index) => (
        <HeartIcon
          key={index}
          fill={
            index < score
              ? "var(--color-primary-700)"
              : "var(--color-secondary-200)"
          }
        />
      ))}
    </div>
  );
};
