"use client";

import { ReviewDetail } from "@/entity/review";
import { useEffect, useState } from "react";
import { ReviewList } from "../reveiwList";
import { Pagination } from "@/components/atom/pagination";
import { getReviews } from "@/effect/reviews/getReviews";

interface ReviewsWithPaginationProps {
  initialReviews: ReviewDetail[];
  gatheringId: string;
  totalPages: number;
}
export const ReviewsWithPagination = ({
  initialReviews,
  gatheringId,
  totalPages,
}: ReviewsWithPaginationProps) => {
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState(initialReviews);

  const fetchMoreReviews = async (page: number) => {
    try {
      const reviewData = await getReviews({
        gatheringId: gatheringId,
        offset: (page - 1) * 4,
      });
      setReviews(reviewData.data);
    } catch (err) {
      console.error("리뷰 fetch 실패:", err);
    }
  };

  useEffect(() => {
    if (page === 1) {
      setReviews(initialReviews);
    } else {
      fetchMoreReviews(page);
    }
  }, [initialReviews, page]);

  return (
    <div className="w-full">
      <ReviewList reviewList={reviews} />
      <div className="mt-8 w-full">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};
