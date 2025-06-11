import { Rating } from "@/components/atom/rating";
import { ReviewDetail } from "@/entity/review";
import dayjs from "dayjs";
import Image from "next/image";
interface ReviewItemProps {
  showImage?: boolean;
  reviewContent: ReviewDetail;
}

export const MyReviewItem = ({
  showImage = false,
  reviewContent,
}: ReviewItemProps) => {
  return (
    <li className="mt-6 flex w-full flex-col items-start gap-6 sm:flex-row sm:items-center">
      {/* 이미지 */}
      {showImage && (
        <div className="relative h-39 w-full overflow-hidden rounded-3xl bg-red-100 sm:max-w-70">
          <Image
            src={reviewContent.Gathering.image}
            alt={`image-${reviewContent.Gathering.name}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
            className="object-cover"
          />
        </div>
      )}

      {/* 텍스트 */}
      <div className="border-b-secondary-200 w-full border-b-2 border-dashed pb-4">
        <Rating score={reviewContent.score} />
        <p className="text-secondary-700 my-4">{reviewContent.comment}</p>
        <p className="text-secondary-700 text-xs">
          {/* 모임명 & 위치 */}
          {reviewContent.Gathering.name} 이용 ·{" "}
          {reviewContent.Gathering.location}
        </p>
        <div className="mt-2.5 flex items-center text-xs">
          {/* 리뷰 작성 날짜 */}
          <div className="text-secondary-500">
            {dayjs(reviewContent.createdAt).format("YYYY.MM.DD")}
          </div>
        </div>
      </div>
    </li>
  );
};
