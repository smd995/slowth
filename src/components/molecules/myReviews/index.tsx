import { Chip } from "@/components/atom/chip";
import { ReviewList } from "@/components/organisms/reveiwList";
import clsx from "clsx";
import { useState } from "react";
import { VerticalWritableReviewCard } from "../verticalWritableReviewCard";
import { HorizontalWritableReviewCard } from "../horizontalWritableReviewCard";
import { ReviewModal } from "../reviewModal";
import { useCompletedGatherings } from "@/hooks/api/useCompletedGatherings";
import { useUserReviews } from "@/hooks/api/useUserReviews";
import useUserStore from "@/stores/userStore";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { JoinedGathering } from "@/entity/gathering";
import { createReview } from "@/effect/reviews/createReview";

interface MyReviewsProps {
  className?: string;
}

export const MyReviews = ({ className }: MyReviewsProps) => {
  const [selectedTab, setSelectedTab] = useState<"writable" | "written">(
    "writable",
  );

  const { user } = useUserStore();

  // 리뷰 모달 상태 관리
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedGathering, setSelectedGathering] =
    useState<JoinedGathering | null>(null);

  // 완료된 모임 데이터 (작성 가능한 리뷰)
  const { gatherings: completedGatherings, isLoading: isLoadingCompleted } =
    useCompletedGatherings();

  // 작성한 리뷰 데이터
  const { reviews: userReviews, isLoading: isLoadingReviews } = useUserReviews(
    user?.id,
  );

  const handleReviewClick = (gathering: JoinedGathering) => {
    setSelectedGathering(gathering);
    setReviewModalOpen(true);
  };

  const handleSubmitReview = async (reviewData: {
    gatheringId: number;
    score: number;
    comment: string;
  }) => {
    try {
      await createReview(reviewData);
      toast.success("리뷰가 작성되었습니다.");
      // SWR을 사용해 데이터 새로고침
      await mutate("completed-gatherings");
      await mutate(`user-reviews-${user?.id}`);
    } catch (error) {
      toast.error("리뷰 작성에 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <div className={clsx(className)}>
      {/* 탭 */}
      <div className="flex gap-2">
        <Chip
          label={"작성가능한 리뷰"}
          selected={selectedTab === "writable"}
          onClick={() => setSelectedTab("writable")}
        />
        <Chip
          label={"작성한 리뷰"}
          selected={selectedTab === "written"}
          onClick={() => setSelectedTab("written")}
        />
      </div>

      {/* 탭에 따른 컨텐츠 */}
      <div className="mt-6">
        {selectedTab === "writable" ? (
          // 작성 가능한 리뷰 리스트
          <div className="space-y-6">
            {isLoadingCompleted ? (
              <div className="flex items-center justify-center py-8">
                <p className="text-secondary-500">로딩중...</p>
              </div>
            ) : completedGatherings.length > 0 ? (
              <>
                {/* Mobile Cards */}
                {completedGatherings.map((gathering) => (
                  <div
                    className="border-b-secondary-200 block w-full border-b-2 border-dashed pb-6 sm:hidden"
                    key={`mobile-${gathering.id}`}
                  >
                    <VerticalWritableReviewCard
                      onReview={() => handleReviewClick(gathering)}
                      gathering={gathering}
                    />
                  </div>
                ))}

                {/* Desktop Cards */}
                {completedGatherings.map((gathering) => (
                  <div
                    className="border-b-secondary-200 hidden w-full border-b-2 border-dashed pb-6 sm:block"
                    key={`desktop-${gathering.id}`}
                  >
                    <HorizontalWritableReviewCard
                      onReview={() => handleReviewClick(gathering)}
                      gathering={gathering}
                    />
                  </div>
                ))}
              </>
            ) : (
              <div className="flex items-center justify-center py-8">
                <p className="text-secondary-500">
                  리뷰 작성 가능한 모임이 없습니다.
                </p>
              </div>
            )}
          </div>
        ) : (
          // 작성한 리뷰 리스트
          <div>
            {isLoadingReviews ? (
              <div className="flex items-center justify-center py-8">
                <p className="text-secondary-500">로딩중...</p>
              </div>
            ) : (
              <ReviewList showImage={true} reviewList={userReviews} />
            )}
          </div>
        )}
      </div>

      {/* 리뷰 작성 모달 */}
      {selectedGathering && (
        <ReviewModal
          isOpen={reviewModalOpen}
          onClose={() => {
            setReviewModalOpen(false);
            setSelectedGathering(null);
          }}
          gatheringId={selectedGathering.id}
          onSubmit={handleSubmitReview}
        />
      )}
    </div>
  );
};
