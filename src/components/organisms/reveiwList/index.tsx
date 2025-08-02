import { ReviewItem } from "@/components/molecules/reviewItem";
import { ReviewDetail } from "@/entities/review";
interface ReviewListProps {
  showImage?: boolean;
  showProfile?: boolean;
  isClickable?: boolean;
  reviewList: ReviewDetail[];
}

export const ReviewList = ({
  showImage = false,
  showProfile = true,
  isClickable = false,
  reviewList,
}: ReviewListProps) => {
  return (
    <ul className="flex w-full flex-col">
      {reviewList.map((review) => (
        <ReviewItem
          key={review.id}
          showImage={showImage}
          showProfile={showProfile}
          reviewContent={review}
          isClickable={isClickable}
        />
      ))}
    </ul>
  );
};
