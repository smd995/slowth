"use client";
import { ReviewDetail } from "@/entity/review";
import { ReviewList } from "../reveiwList";
import { useInView } from "react-intersection-observer";
import { useCallback, useEffect, useState } from "react";
import { getReviews } from "@/effect/reviews/getReviews";
import { FilterBar } from "@/components/molecules/filterBar";
import { Filters } from "@/entity/filters";
import { reviewsSortOptions } from "@/constants/sortOptions";
import { getFormattedDate } from "@/libs/date/getFormattedDate";

interface ReviewDetailProps {
  initialReviews: ReviewDetail[];
  selectedType: string;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const REVIEW_LIMIT = 10;

export const ReviewsWithInfiniteScroll = ({
  initialReviews,
  selectedType,
  filters,
  setFilters,
}: ReviewDetailProps) => {
  const [reviews, setReviews] = useState<ReviewDetail[]>([]);
  const [offset, setOffset] = useState(REVIEW_LIMIT);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    setReviews(initialReviews);
    setOffset(REVIEW_LIMIT);
    setHasMore(true);
  }, [initialReviews, selectedType, filters]);

  const loadMoreReviews = useCallback(async () => {
    const newReviews = await getReviews({
      limit: REVIEW_LIMIT,
      offset: offset,
      type: selectedType,
      location: filters.region === "all" ? undefined : filters.region,
      date: getFormattedDate(filters.date),
      sortBy: filters.sort.sortBy,
      sortOrder: filters.sort.sortOrder,
    });
    if (newReviews.data.length < 1) {
      setHasMore(false);
      return;
    }
    setReviews((prevReviews) => [...prevReviews, ...newReviews.data]);
    setOffset((prev) => prev + REVIEW_LIMIT);

    if (newReviews.currentPage === newReviews.totalPages) {
      setHasMore(false);
    }
  }, [offset, selectedType, filters]);

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreReviews();
    }
  }, [inView, hasMore, loadMoreReviews]);

  return (
    <div className="border-secondary-900 flex h-full min-h-[750px] w-full flex-col border-t-2 bg-white px-4 pt-6 sm:px-6">
      <FilterBar
        sortOptions={reviewsSortOptions}
        defaultSortValue="closingSoon"
        onFilterChange={({ region, date, sort }) => {
          setFilters({ region, date, sort });
        }}
      />
      {!initialReviews || initialReviews.length < 1 ? (
        <div className="my-auto flex w-full items-center justify-center">
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
