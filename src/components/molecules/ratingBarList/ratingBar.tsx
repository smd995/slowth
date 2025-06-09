"use client";
import { ProgressBar } from "@/components/atom/progressBar";

interface RatingBarProps {
  score: number;
  count: number;
  countSum: number;
}

export const RatingBar = ({ score, count, countSum }: RatingBarProps) => {
  return (
    <li className="flex w-full items-center gap-3">
      <span className="text-secondary-700 w-fit text-sm font-medium">
        {score}점
      </span>
      <div className="grow">
        <ProgressBar
          currentCount={count}
          totalCount={countSum}
          isColored={false}
        />
      </div>
      <span className="text-secondary-700 w-4.5 text-sm font-medium">
        {count}
      </span>
    </li>
  );
};
