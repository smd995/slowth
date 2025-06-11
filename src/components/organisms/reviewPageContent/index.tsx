"use client";
import { useEffect, useState } from "react";
import { RatingOverview } from "../ratingOverview";
import { Scores } from "@/entity/scores";
import { ReviewDetail } from "@/entity/review";
import { ReviewsWithInfiniteScroll } from "../reviewsWithInfiniteScroll";
import { getReviews } from "@/effect/reviews/getReviews";
import { CategoryTab } from "@/components/molecules/categoryTab";
import { DEFAULT_TYPE } from "@/constants/category";
import { getScores } from "@/effect/reviews/getScores";

interface ReviewPageContentProps {
  initialReviews: ReviewDetail[];
  initalScore: Scores;
}

export const ReviewPageContent = ({
  initialReviews,
  initalScore,
}: ReviewPageContentProps) => {
  const [selectedType, setSelectedType] = useState(DEFAULT_TYPE);
  const [reviews, setReviews] = useState(initialReviews);
  const [scores, setScores] = useState<Scores>(initalScore);

  useEffect(() => {
    const reloadInitialData = async () => {
      const newScoresData = await getScores({ type: selectedType });
      setScores(newScoresData[0]);

      const newReviewsData = await getReviews({
        type: selectedType,
        limit: 5,
      });

      setReviews(newReviewsData.data);
    };
    reloadInitialData();
  }, [selectedType]);
  return (
    <>
      <div className="border-b-secondary-200 border-b-2 pb-2.5 sm:pb-3.5">
        <CategoryTab setSelectedType={setSelectedType} />
      </div>

      <RatingOverview scores={scores} />
      <ReviewsWithInfiniteScroll
        initialReviews={reviews}
        selectedType={selectedType}
      />
    </>
  );
};
