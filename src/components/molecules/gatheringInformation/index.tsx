"use client";
import { InfoChip } from "@/components/atom/infoChip";
import { ParticipantInfo } from "./participantInfo";
import { LikeButton } from "@/components/atom/likeButton";
import { useEffect, useState } from "react";
import { Gathering } from "@/entity/gathering";
import { participantAvatar } from "./avatarList";

interface GatheringInformationProps {
  gatheringInfo: Gathering;
  participantAvatars: participantAvatar[];
}

export const GatheringInformation = ({
  gatheringInfo,
  participantAvatars,
}: GatheringInformationProps) => {
  const [isLiked, setIsLiked] = useState(true);

  useEffect(() => {
    // 좋아요 액션 처리 (gatheringInfo.id 기반)
  }, [isLiked]);
  return (
    <div className="relative flex h-60 w-full flex-col rounded-3xl border-2 border-gray-200 bg-white px-6 py-6 md:h-[270px]">
      {/* 찜하기 버튼 */}
      <div className="absolute top-6 right-6">
        <LikeButton isLiked={isLiked} setIsLiked={setIsLiked} />
      </div>

      {/* 상세 정보 */}
      <div className="relative flex w-fit grow flex-col">
        <p className="text-lg font-semibold">{gatheringInfo?.name}</p>
        <p className="text-sm font-medium text-gray-700">
          {gatheringInfo?.location}
        </p>
        <div className="mt-3.5 flex gap-x-2">
          {/* gatheringInfo.dateTime 처리해서 넘겨주기 */}
          <InfoChip type="date">1월 7일</InfoChip>
          <InfoChip type="time">17:30</InfoChip>
        </div>
      </div>

      {/* 구분선 */}
      <hr className="-mx-6 my-4 border-t-2 border-dashed border-gray-200" />

      {/* 참여 인원 정보 */}
      <ParticipantInfo
        participantAvatars={participantAvatars}
        participantCount={gatheringInfo.participantCount}
        capacity={gatheringInfo.capacity}
      />
    </div>
  );
};
