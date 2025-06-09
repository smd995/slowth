"use client";
import { useMemo, useState } from "react";
import { RatingOverview } from "../ratingOverview";
import { Scores } from "@/entity/scores";
import { ReviewDetail } from "@/entity/review";
import { ReviewsWithInfiniteScroll } from "../reviewsWithInfiniteScroll";

interface ReviewPageContentProps {
  initialReviews: ReviewDetail[];
  initalScore: Scores;
}

export const ReviewPageContent = ({
  initialReviews,
  initalScore,
}: ReviewPageContentProps) => {
  const memoizedReviews = useMemo(() => initialReviews, [initialReviews]);
  const [scores] = useState<Scores>(initalScore);

  return (
    <>
      <div>{scores && <RatingOverview scores={scores} />}</div>
      <ReviewsWithInfiniteScroll initialReviews={memoizedReviews} />
    </>
  );
};
