"use client";

import clsx from "clsx";
import dayjs from "dayjs";
import Image from "next/image";
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
  isDimmed?: boolean;
  onClick?: () => void;
}

export const GatheringCard = ({
  gathering,
  isDimmed = false,
  onClick,
}: GatheringCardProps) => {
  const isFull = gathering.participantCount >= gathering.capacity;

  return (
    <article
      onClick={onClick}
      className={clsx(
        "border-secondary-100 relative flex cursor-pointer overflow-hidden rounded-3xl border-2 bg-white transition",
        "flex-col sm:flex-row",
        {
          "pointer-events-none": isDimmed,
        },
      )}
    >
      {/* 썸네일 이미지 */}
      <div className="relative h-[156px] w-full sm:w-72">
        <Image
          src={gathering.image || "/image/alt-place.jpg"}
          alt={gathering.name}
          fill
          className="object-cover"
        />
        <DeadlineTag registrationEnd={gathering.registrationEnd} />
      </div>

      {/* 우측 본문 */}
      <div className="flex flex-1 flex-col justify-between gap-6 p-4 sm:gap-0 sm:pt-4 sm:pr-4 sm:pb-4 sm:pl-6">
        {/* 카드 헤더 그룹 */}
        <div className="flex items-start justify-between gap-2">
          {/* 텍스트 정보 영역 */}
          <div className="flex min-w-0 flex-col gap-2">
            <header className="flex min-w-0 items-center">
              <h3 className="text-secondary-900 min-w-0 truncate text-lg font-semibold">
                {gathering.name}
              </h3>
              <span className="text-secondary-500 mx-2 text-sm sm:text-lg">
                |
              </span>
              <p className="text-secondary-700 min-w-0 truncate">
                {gathering.location}
              </p>
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
            <div className="bg-heart-base z-30 flex size-11 shrink-0 items-center justify-center rounded-full">
              <ByeIcon className="h-6 w-6" />
            </div>
          ) : (
            <div className="shrink-0">
              <LikeButton gatheringId={gathering.id} />
            </div>
          )}
        </div>

        <div className="flex items-end justify-between gap-6">
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
