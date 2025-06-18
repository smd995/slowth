"use client";

import type { JoinedGathering } from "@/entity/gathering";
import { VerticalCreatedGatheringCard } from "../verticalCreatedGatheringCard";
import { HorizontalCreatedGatheringCard } from "../horizontalCreatedGatheringCard";

export const CreatedGatherings = ({
  createdGatherings,
}: {
  createdGatherings: JoinedGathering[];
}) => {
  return (
    <div className="space-y-6">
      {/* 예정된 모임 */}
      {createdGatherings.length > 0 && (
        <section>
          <div className="space-y-6">
            {createdGatherings.map((gathering: JoinedGathering) => (
              <div key={gathering.id}>
                {/* Mobile: Vertical card */}
                <div className="border-b-secondary-200 block w-full border-b-2 border-dashed pb-6 sm:hidden">
                  <VerticalCreatedGatheringCard gathering={gathering} />
                </div>

                {/* Desktop: Horizontal card */}
                <div className="border-b-secondary-200 hidden w-full border-b-2 border-dashed pb-6 sm:block">
                  <HorizontalCreatedGatheringCard gathering={gathering} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 빈 상태 */}
      {createdGatherings.length === 0 && (
        <div className="flex min-h-screen items-center justify-center text-center">
          <p className="text-secondary-500">신청한 모임이 아직 없어요.</p>
        </div>
      )}

      {/* 리뷰 작성 모달
      {selectedGathering && (
        <ReviewModal
          isOpen={reviewModalOpen}
          onClose={() => {
            setReviewModalOpen(false);
            setSelectedGathering(null);
          }}
          gathering={selectedGathering}
          onSubmit={handleSubmitReview}
        />
      )} */}
    </div>
  );
};
