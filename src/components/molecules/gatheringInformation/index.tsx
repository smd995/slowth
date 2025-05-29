"use client";
import { InfoChip } from "@/components/atom/infoChip";
import { ParticipantInfo } from "./participantInfo";
import { LikeButton } from "@/components/atom/likeButton";
import { Gathering } from "@/entity/gathering";
import { participantAvatar } from "./avatarList";
import dayjs from "dayjs";

interface GatheringInformationProps {
  gatheringInfo: Gathering;
  participantAvatars: participantAvatar[];
}

export const GatheringInformation = ({
  gatheringInfo,
  participantAvatars,
}: GatheringInformationProps) => {
  return (
    <div className="relative flex h-60 w-full flex-col rounded-3xl border-2 border-gray-200 bg-white px-6 py-6 md:h-[270px]">
      {/* 찜하기 버튼 */}
      <div className="absolute top-6 right-6">
        <LikeButton gatheringId={gatheringInfo.id} />
      </div>

      {/* 상세 정보 */}
      <div className="relative flex w-fit grow flex-col">
        <p className="text-lg font-semibold">{gatheringInfo?.name}</p>
        <p className="text-sm font-medium text-gray-700">
          {gatheringInfo?.location}
        </p>
        <div className="mt-3.5 flex gap-x-2">
          {/* 날짜 및 시간 */}
          <InfoChip type="date">
            {dayjs(gatheringInfo.dateTime).format("M월 D일")}
          </InfoChip>
          <InfoChip type="time">
            {dayjs(gatheringInfo.dateTime).format("HH:mm")}
          </InfoChip>
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
