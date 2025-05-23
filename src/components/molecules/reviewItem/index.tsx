import { Avatar } from "@/components/atom/avatar";
import { Rating } from "@/components/atom/rating";
import { ReviewDetail } from "@/entity/review";
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
    <li className="mt-6 flex w-full flex-col items-center gap-6 sm:flex-row">
      {/* 이미지 */}
      {showImage && (
        <div className="h-39 w-full rounded-3xl bg-red-100 sm:max-w-70">
          이미지
        </div>
      )}

      {/* 텍스트 */}
      <div className="border-b-secondary-200 border-b-2 border-dashed pb-4">
        <Rating score={3} />
        <p className="text-secondary-700 my-4">{reviewContent.comment}</p>
        <p className="text-secondary-700 text-xs">
          {/* ===============location 어떻게 되는건가....================== */}
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
