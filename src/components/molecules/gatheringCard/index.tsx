"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import dayjs from "dayjs";
import { Gathering } from "@/entity/gathering";
import { InfoChip } from "@/components/atom/infoChip";
import { LikeButton } from "@/components/atom/likeButton";
import { ProgressBar } from "@/components/atom/progressBar";
import { OpenConfirmedBadge } from "@/components/atom/openConfirmedBadge";
import { UserIcon } from "@/components/icons/UserIcon";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { ByeIcon } from "@/components/icons/ByeIcon";
import { DeadlineTag } from "@/components/atom/deadlineTag";

export interface GatheringCardProps {
  gathering: Gathering;
  isLiked?: boolean;
  isDimmed?: boolean;
}

export const GatheringCard = ({
  gathering,
  isLiked: likedProp = false,
  isDimmed = false,
}: GatheringCardProps) => {
  const [isLiked, setIsLiked] = useState(likedProp);
  const isFull = gathering.participantCount >= gathering.capacity;
  const router = useRouter();
  const goToGatheringDetail = () => {
    router.push(`/gathering/${gathering.id}`); // 모임 상세 페이지로 이동
  };

  useEffect(() => {
    const stored = localStorage.getItem(`liked-${gathering.id}`);
    if (stored === "true") setIsLiked(true);
  }, [gathering.id]);

  useEffect(() => {
    localStorage.setItem(`liked-${gathering.id}`, isLiked.toString());
  }, [isLiked, gathering.id]);

  return (
    <article
      onClick={goToGatheringDetail}
      className={clsx(
        "border-secondary-100 relative flex cursor-pointer flex-row overflow-hidden rounded-3xl border-2 bg-white transition",
        {
          "pointer-events-none": isDimmed,
        },
      )}
    >
      {/* 썸네일 이미지 */}
      <div className="relative h-[156px] w-72">
        <img
          src={gathering.image || "/image/alt-place.jpg"}
          alt={gathering.name}
          className="h-full w-full object-cover"
        />
        <DeadlineTag registrationEnd={gathering.registrationEnd} />
      </div>

      {/* 우측 본문 */}
      <div className="flex flex-1 flex-col justify-between">
        {/* 카드 헤더 그룹 */}
        <div className="flex items-start justify-between pt-4 pr-4 pb-[21px] pl-6">
          {/* 텍스트 정보 영역 */}
          <div className="flex flex-col gap-2">
            <header className="flex items-center">
              <h3 className="text-lg font-semibold text-gray-900 after:mx-2 after:content-['|']">
                {gathering.name}
              </h3>
              <p className="text-gray-400">{gathering.location}</p>
            </header>

            <div className="flex items-center gap-2">
              <InfoChip type="date">
                {dayjs(gathering.dateTime).format("M월 D일")}
              </InfoChip>
              <InfoChip type="time">
                {dayjs(gathering.dateTime).format("HH:mm")}
              </InfoChip>
            </div>
          </div>

          {/* 찜 or 바이콘 */}
          {isDimmed ? (
            <div className="bg-heart-base z-30 flex size-11 items-center justify-center rounded-full">
              <ByeIcon className="h-6 w-6" />
            </div>
          ) : (
            <LikeButton gatheringId={gathering.id} />
          )}
        </div>

        <div className="flex items-end justify-between gap-6 pt-2 pr-6 pb-4 pl-6">
          {/* 좌측 */}
          <div className="flex flex-1 flex-col gap-2">
            <div
              className={clsx("flex items-center gap-3 text-sm", {
                "text-primary-500": isFull,
                "text-gray-700": !isFull,
              })}
            >
              <div
                className={clsx("flex items-center gap-1", {
                  "text-primary-500": isFull,
                  "text-secondary-700": !isFull,
                })}
              >
                <UserIcon className="h-4 w-4" />
                <span className="font-medium">
                  {gathering.participantCount}/{gathering.capacity}
                </span>
              </div>
              <OpenConfirmedBadge
                participantCount={gathering.participantCount}
                capacity={gathering.capacity}
              />
            </div>
            <ProgressBar
              currentCount={gathering.participantCount}
              totalCount={gathering.capacity}
              isAnimated={false}
            />
          </div>

          {/* 우측 CTA 또는 종료 안내 */}
          <div className="flex-shrink-0">
            {isFull ? (
              <div className="text-primary-600 text-sm font-semibold">
                Closed
              </div>
            ) : (
              <div className="text-primary-600 flex items-center gap-1 text-sm font-semibold">
                <span>Join now</span>
                <ArrowRight className="text-primary-600 h-4 w-4" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 디머 레이어 */}
      {isDimmed && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[rgba(0,0,0,0.8)] text-center">
          <p className="text-center leading-5 text-white">
            종료된 챌린지예요,
            <br />
            다음 기회에 만나요 <span>🙏</span>
          </p>
        </div>
      )}
    </article>
  );
};
