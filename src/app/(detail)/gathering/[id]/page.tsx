import { DeadlineTag } from "@/components/atom/deadlineTag";
import { BottomFloatingBarWrapper } from "@/components/molecules/bottomFloatingBar/bottomFloatingBarWrapper";
import { GatheringInformation } from "@/components/molecules/gatheringInformation";
import { ReviewsWithPagination } from "@/components/organisms/reviewsWithPagination";
import {
  getGatheringDetail,
  getParticipants,
} from "@/effect/gatherings/getGatheringDetail";
import { getReviews } from "@/effect/reviews/getReviews";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // 모임 상세 조회
  const gatheringData = await getGatheringDetail(id);
  if (!gatheringData) return notFound();

  // 특정 모임의 참가자 목록 조회 (avatarList용)
  const participantAvatars = await getParticipants(id);
  // 리뷰 목록 조회
  const reviewList = await getReviews({ gatheringId: id, limit: 4 });

  return (
    <>
      <div className="flex h-fit flex-col items-center">
        <div className="bg-secondary-50 flex h-full min-h-screen w-full max-w-[1200px] flex-col items-center px-4 pt-6 sm:px-6 sm:pt-6.5 md:pt-10">
          {/* 이미지 및 상세정보 */}
          <div className="grid w-full max-w-[996px] grid-rows-2 gap-4 sm:grid-cols-2 sm:grid-rows-1 md:gap-6">
            <div className="relative h-full w-full overflow-hidden rounded-3xl">
              <Image
                src={gatheringData.image}
                alt={`image-${gatheringData.name}` || "/image/alt-place.jpg"}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                priority
                className="object-cover"
              />
              <DeadlineTag
                className="!pr-4"
                registrationEnd={gatheringData.registrationEnd}
              />
            </div>
            <GatheringInformation
              gatheringInfo={gatheringData}
              participantAvatars={participantAvatars}
            />
          </div>
          {/* 리뷰 */}
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
                gatheringId={gatheringData.id}
                initialReviews={reviewList.data}
                totalPages={reviewList.totalPages}
              />
            )}
          </div>
        </div>
      </div>
      <BottomFloatingBarWrapper gathering={gatheringData} />
    </>
  );
}
