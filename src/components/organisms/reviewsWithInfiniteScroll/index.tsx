"use client";
import { ReviewDetail } from "@/entity/review";
import { ReviewList } from "../reveiwList";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { getReviews } from "@/effect/reviews/getReviews";

interface ReviewDetailProps {
  initialReviews: ReviewDetail[];
}

const REVIEW_LIMIT = 5;

export const ReviewsWithInfiniteScroll = ({
  initialReviews,
}: ReviewDetailProps) => {
  const [reviews, setReviews] = useState(initialReviews);
  const [offset, setOffset] = useState(REVIEW_LIMIT);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView({ threshold: 0.5 });

  const loadMoreReviews = async () => {
    console.log("✅loadMoreReviews 데이터 더 로딩 ");

    const newReviews = await getReviews({
      limit: REVIEW_LIMIT,
      offset: offset,
    });
    setReviews((prevReviews) => [...prevReviews, ...newReviews.data]);
    setOffset((prev) => prev + REVIEW_LIMIT);
    if (newReviews.currentPage === newReviews.totalPages) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreReviews();
    }
  }, [inView, hasMore]);

  return (
    // height 조절 필요
    <div className="border-secondary-900 flex h-full min-h-[800px] w-full flex-col border-t-2 bg-white px-4 pt-6 sm:px-6">
      {!initialReviews ? (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-secondary-500">아직 리뷰가 없어요</p>
        </div>
      ) : (
        <>
          <ReviewList reviewList={reviews} showImage />
          <div ref={ref} className="h-10 w-full overflow-hidden opacity-0" />
        </>
      )}
    </div>
  );
};
