import { ReviewItem } from "@/components/molecules/reviewItem";
import { ReviewDetail } from "@/entity/review";
interface ReviewListProps {
  showImage?: boolean;
  showProfile?: boolean;
  reviewList: ReviewDetail[];
}

export const ReviewList = ({
  showImage = false,
  showProfile = true,
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
        />
      ))}
    </ul>
  );
};
