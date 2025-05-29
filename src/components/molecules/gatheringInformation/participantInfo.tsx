// 상세페이지 내 모집 정원, 최소인원, 최대인원 등의 정보를 나타내는 컴포넌트
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
  return (
    <div className="flex w-full flex-col gap-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* 숫자 올라가는 애니메이션 추가해야함 */}
          <div className="mr-3 text-sm font-semibold">
            모집정원 {participantCount}명
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
