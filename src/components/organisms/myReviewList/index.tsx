import { MyReviewItem } from "@/components/molecules/myReviewItem";
import { ReviewDetail } from "@/entity/review";
interface ReviewListProps {
  showImage?: boolean;
  showProfile?: boolean;
  reviewList: ReviewDetail[];
}

export const MyReviewList = ({
  showImage = false,
  reviewList,
}: ReviewListProps) => {
  return (
    <ul className="flex w-full flex-col">
      {reviewList.map((review) => (
        <MyReviewItem
          key={review.id}
          showImage={showImage}
          reviewContent={review}
        />
      ))}
    </ul>
  );
};
