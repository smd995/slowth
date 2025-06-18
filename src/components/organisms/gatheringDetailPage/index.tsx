"use client";
import { DeadlineTag } from "@/components/atom/deadlineTag";
import { BottomFloatingBarWrapper } from "@/components/molecules/bottomFloatingBar/bottomFloatingBarWrapper";
import { GatheringInformation } from "@/components/molecules/gatheringInformation";
import { useGatheringDetail } from "@/hooks/api/useGatheringDetail";
import Image from "next/image";
import { ReviewsWithPagination } from "../reviewsWithPagination";
import { ReviewList } from "@/entity/review";
import { Modal } from "@/components/atom/modal";
import { useEffect, useState } from "react";
import { Button } from "@/components/atom/button";
import { useRouter } from "next/navigation";

interface GatheringPageClientProps {
  gatheringId: string;
  reviewList: ReviewList;
}

export const GatheringDetailPage = ({
  gatheringId,
  reviewList,
}: GatheringPageClientProps) => {
  const router = useRouter();
  const [isCanceledModalOpen, setCanceledModalOpen] = useState(false);
  const { gathering, participants, isLoading, isError } =
    useGatheringDetail(gatheringId);

  useEffect(() => {
    if (gathering?.canceledAt) {
      console.log("취소된 모임");
      setCanceledModalOpen(true);
    }
  }, [gathering?.canceledAt]);

  if (isError) {
    throw isError;
  }

  if (isLoading || !gathering) {
    return <div>Loading...</div>; // 로딩 스피너 컴포넌트로 교체
  }

  return (
    <>
      <div className="flex h-fit flex-col items-center">
        <div className="bg-secondary-50 flex h-full min-h-screen w-full max-w-[1200px] flex-col items-center px-4 pt-6 sm:px-6 sm:pt-6.5 md:pt-10">
          {/* 이미지 및 상세정보 */}
          <div className="grid w-full max-w-[996px] grid-rows-2 gap-4 sm:grid-cols-2 sm:grid-rows-1 md:gap-6">
            <div className="relative h-full w-full overflow-hidden rounded-3xl">
              <Image
                src={gathering.image || "/image/alt-place.jpg"}
                alt={`image-${gathering.name}` || "/image/alt-place.jpg"}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                priority
                className="object-cover"
              />
              <DeadlineTag
                className="!pr-4"
                registrationEnd={gathering.registrationEnd}
              />
            </div>
            <GatheringInformation
              gatheringInfo={gathering}
              participantAvatars={participants}
            />
          </div>
          <div className="border-t-secondary-200 mt-4 flex w-full max-w-[996px] grow flex-col border-t-2 bg-white px-7 pt-7 pb-28 sm:mt-5 md:mt-6">
            <p className="text-secondary-900 h-fit font-semibold sm:text-lg">
              이용자들은 이 프로그램을 이렇게 느꼈어요!
            </p>
            {!reviewList || reviewList.totalItemCount === 0 ? (
              <div className="flex w-full grow items-center justify-center">
                <p className="text-secondary-500">아직 리뷰가 없어요</p>
              </div>
            ) : (
              <ReviewsWithPagination
                gatheringId={gathering.id}
                initialReviews={reviewList.data}
                totalPages={reviewList.totalPages}
              />
            )}
          </div>
        </div>
      </div>
      <BottomFloatingBarWrapper gathering={gathering} />
      <Modal
        size="sm"
        isOpen={isCanceledModalOpen}
        onClose={() => setCanceledModalOpen(false)}
      >
        <div className="flex w-full flex-col items-center justify-center">
          <p className="text-secondary-900 mb-10 text-base">
            취소된 모임입니다.
          </p>
          <Button size="lg" className="w-28" onClick={() => router.push("/")}>
            확인
          </Button>
        </div>
      </Modal>
    </>
  );
};
