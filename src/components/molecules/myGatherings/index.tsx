"use client";

import type { JoinedGathering } from "@/entity/gathering";
import { VerticalMyGatheringCard } from "@/components/molecules/verticalMyGatheringCard";
import { HorizontalMyGatheringCard } from "../horizontalMyGatheringCard";
import { toast } from "react-toastify";
import { useGatheringStore } from "@/stores/gatheringStore";
import { useRouter } from "next/navigation";
import { leaveGathering } from "@/effect/gatherings/leaveGathering";

export const MyGatherings = ({
  upcomingGatherings,
}: {
  upcomingGatherings: JoinedGathering[];
}) => {
  const { fetchUpcomingGatherings } = useGatheringStore();
  const router = useRouter();

  const handleCancelGathering = async (gatheringId: number) => {
    try {
      await leaveGathering(gatheringId);
      toast.success("모임이 취소되었습니다.");
      await fetchUpcomingGatherings();
    } catch (error) {
      toast.error("모임 취소에 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* 예정된 모임 */}
      {upcomingGatherings.length > 0 && (
        <section>
          <div className="space-y-6">
            {upcomingGatherings.map((gathering: JoinedGathering) => (
              <div key={gathering.id}>
                {/* Mobile: Vertical card */}
                <div className="border-b-secondary-200 block w-full border-b-2 border-dashed pb-6 sm:hidden">
                  <VerticalMyGatheringCard
                    gathering={gathering}
                    onCancel={() => handleCancelGathering(gathering.id)}
                    onReview={() => {}}
                    onRouter={() => router.push(`/gathering/${gathering.id}`)}
                  />
                </div>

                {/* Desktop: Horizontal card */}
                <div className="border-b-secondary-200 hidden w-full border-b-2 border-dashed pb-6 sm:block">
                  <HorizontalMyGatheringCard
                    gathering={gathering}
                    onCancel={() => handleCancelGathering(gathering.id)}
                    onReview={() => {}}
                    onRouter={() => router.push(`/gathering/${gathering.id}`)}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 빈 상태 */}
      {upcomingGatherings.length === 0 && (
        <div className="flex min-h-screen items-center justify-center text-center">
          <p className="text-secondary-500">내가 만든 모임이 아직 없어요.</p>
        </div>
      )}

      {/* 리뷰 작성 모달 */}
      {/* <ReviewModal /> */}
    </div>
  );
};
