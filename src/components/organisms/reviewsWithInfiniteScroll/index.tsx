import { ReviewDetail } from "@/entity/review";
import { ReviewList } from "../reveiwList";

interface ReviewDetailProps {
  initialReviews: ReviewDetail[];
}

export const ReviewsWithInfiniteScroll = ({
  initialReviews,
}: ReviewDetailProps) => {
  return (
    // height 조절 필요
    <div className="border-secondary-900 flex h-full min-h-[800px] w-full flex-col border-t-2 bg-white">
      {initialReviews.length < 1 ? (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-secondary-500">아직 리뷰가 없어요</p>
        </div>
      ) : (
        <ReviewList reviewList={initialReviews} showImage />
      )}
    </div>
  );
};
