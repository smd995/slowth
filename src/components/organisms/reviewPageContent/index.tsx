"use client";
import { useEffect, useState } from "react";
import { RatingOverview } from "../ratingOverview";
import { Scores } from "@/entity/scores";
import { ReviewDetail } from "@/entity/review";
import { ReviewsWithInfiniteScroll } from "../reviewsWithInfiniteScroll";
import { getReviews } from "@/effect/reviews/getReviews";
import { CategoryTab } from "@/components/molecules/categoryTab";
import { DEFAULT_TYPE, reviewsSortOptions } from "@/shared/config";
import { getScores } from "@/effect/reviews/getScores";
import { Filters } from "@/entity/filters";
import { getFormattedDate } from "@/shared/lib";

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
  const [filters, setFilters] = useState<Filters>({
    region: "all",
    date: null,
    sort: reviewsSortOptions[0],
  });

  useEffect(() => {
    const reloadInitialData = async () => {
      const newScoresData = await getScores({ type: selectedType });
      setScores(newScoresData[0]);

      const newReviewsData = await getReviews({
        type: selectedType,
        location: filters.region === "all" ? undefined : filters.region,
        date: getFormattedDate(filters.date),
        sortBy: filters.sort.sortBy,
        sortOrder: filters.sort.sortOrder,
        limit: 10,
      });
      setReviews(newReviewsData.data);
    };
    reloadInitialData();
  }, [selectedType, filters]);
  return (
    <>
      <div className="border-b-secondary-200 border-b-2 pb-2.5 sm:pb-3.5">
        <CategoryTab setSelectedType={setSelectedType} />
      </div>

      <RatingOverview scores={scores} />
      <ReviewsWithInfiniteScroll
        initialReviews={reviews}
        selectedType={selectedType}
        filters={filters}
        setFilters={setFilters}
      />
    </>
  );
};
