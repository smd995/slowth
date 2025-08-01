import { Rating } from "@/components/atom/rating";
import { RatingBars } from "@/components/molecules/ratingBarList";
import { formatScoreSummary } from "@/shared/lib";
import { Scores } from "@/entity/scores";

interface RatingOverviewProps {
  scores?: Scores;
}

export const RatingOverview = ({ scores }: RatingOverviewProps) => {
  const scoreSummary = formatScoreSummary(scores);

  return (
    <div className="border-secondary-200 flex h-45 w-full items-center justify-between gap-5 border-y-2 bg-white px-6.5 sm:px-18 lg:px-48">
      <div className="flex flex-col items-center">
        <div className="text-xl font-semibold">
          <span className="text-secondary-900">
            {scores?.averageScore || 0}
          </span>
          <span className="text-secondary-400"> /5</span>
        </div>
        <Rating score={scores?.averageScore || 0} />
      </div>
      <RatingBars
        scoreSummary={
          scoreSummary || { totalCount: 1, scoreList: [0, 0, 0, 0, 0] }
        }
      />
    </div>
  );
};
