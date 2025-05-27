import { Avatar } from "@/components/atom/avatar";
import { Rating } from "@/components/atom/rating";
import { ReviewDetail } from "@/entity/review";
import Image from "next/image";
interface ReviewItemProps {
  showImage?: boolean;
  showProfile?: boolean;
  reviewContent: ReviewDetail;
}

export const ReviewItem = ({
  showImage = false,
  showProfile = true,
  reviewContent,
}: ReviewItemProps) => {
  return (
    <li className="mt-6 flex w-full flex-col items-start gap-6 sm:flex-row">
      {/* 이미지 */}
      {showImage && (
        <div className="relative h-39 w-full overflow-hidden rounded-3xl bg-red-100 sm:max-w-70">
          <Image
            src={reviewContent.Gathering.image}
            alt={`image-${reviewContent.Gathering.name}`}
            fill
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
          {/* 사용자 프로필 */}
          {showProfile && (
            <div className="flex items-center">
              <Avatar
                username={reviewContent.User.name}
                src={reviewContent.User.image}
                className="!size-6"
              />
              <span className="text-secondary-700 ml-2.5">
                {reviewContent.User.name}
              </span>
              <span className="text-secondary-700 mx-2.5">|</span>
            </div>
          )}

          {/* 리뷰 작성 날짜 */}
          {/* {reviewContent.createdAt} 변환해서 사용 예정 */}
          <div className="text-secondary-500">2024.01.25</div>
        </div>
      </div>
    </li>
  );
};
