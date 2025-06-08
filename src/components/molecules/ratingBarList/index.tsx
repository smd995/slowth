import { ScoreSummary } from "@/entity/scores";
import { RatingBar } from "./ratingBar";

interface RatingBarsProps {
  scoreSummary?: ScoreSummary;
}

export const RatingBars = ({ scoreSummary }: RatingBarsProps) => {
  return (
    <ul className="flex w-full max-w-76 flex-col gap-1">
      {scoreSummary &&
        scoreSummary.scoreList.map((count, idx) => (
          <RatingBar
            key={`ratingBar-${idx + 1}`}
            score={idx + 1}
            count={count}
            countSum={scoreSummary.totalCount}
          />
        ))}
    </ul>
  );
};
