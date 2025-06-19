// 상세페이지 내 모집 정원, 최소인원, 최대인원 등의 정보를 나타내는 컴포넌트
"use client";

import { animate, useMotionValue, motion, useTransform } from "motion/react";
import { useEffect } from "react";
import { ProgressBar } from "@/components/atom/progressBar";
import { AvartarList, participantAvatar } from "./avatarList";
import { OpenConfirmedBadge } from "@/components/atom/openConfirmedBadge";

interface ParticipantInfoProps {
  participantCount: number;
  capacity: number;
  participantAvatars: participantAvatar[];
}

export const ParticipantInfo = ({
  participantCount,
  capacity,
  participantAvatars,
}: ParticipantInfoProps) => {
  const motionValue = useMotionValue(0);
  const toFixedMotionValue = useTransform(motionValue, (latest) =>
    latest.toFixed(0),
  );
  useEffect(() => {
    const control = animate(motionValue, participantCount, { duration: 1.5 });
    return () => control.stop();
  }, []);

  return (
    <div className="flex w-full flex-col gap-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-3 text-sm font-semibold">
            모집정원 <motion.span>{toFixedMotionValue}</motion.span>명
          </div>
          {/* 참가자 프로필 목록 */}
          <AvartarList
            participantCount={participantCount}
            participantAvatars={participantAvatars}
          />
        </div>
        {/* 개설확정 뱃지*/}
        <OpenConfirmedBadge
          participantCount={participantCount}
          capacity={capacity}
        />
      </div>
      <ProgressBar
        currentCount={participantCount}
        totalCount={capacity}
        isAnimated={true}
      />
      <div className="flex justify-between text-xs font-medium">
        <p>최소인원 {5}명</p>
        <p>최대인원 {capacity}명</p>
      </div>
    </div>
  );
};
