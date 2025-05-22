// 상세페이지 내 모집 정원, 최소인원, 최대인원 등의 정보를 나타내는 컴포넌트
import { ProgressBar } from "@/components/atom/progressBar";
import { AvartarList } from "./avatarList";
import { OpenConfirmedBadge } from "@/components/atom/openConfirmedBadge";

import { User } from "./avatarList";
// 예시 데이터 입니다 (추후 삭제 예정)
export const userListExample: User[] = [
  {
    id: 1,
    name: "Alice",
  },
  {
    id: 2,
    name: "Bob",
  },
  {
    id: 3,
    name: "Charlie",
  },
  {
    id: 4,
    name: "Lee",
  },
  {
    id: 5,
    name: "Seo",
  },
  {
    id: 6,
    name: "Eunbin",
  },
];

interface ParticipantInfoProps {
  participantCount: number;
  capacity: number;
}

export const ParticipantInfo = ({
  participantCount,
  capacity,
}: ParticipantInfoProps) => {
  return (
    <div className="flex w-full flex-col gap-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* 숫자 올라가는 애니메이션 추가해야함 */}
          <div className="mr-3 text-sm font-semibold">
            모집정원 {participantCount}명
          </div>
          {/* props 수정 필요 */}
          <AvartarList UserList={userListExample} />
        </div>
        {/* 개설확정 뱃지*/}
        <OpenConfirmedBadge participantCount={participantCount} />
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
