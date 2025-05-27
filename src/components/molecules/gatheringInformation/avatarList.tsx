import { Avatar } from "@/components/atom/avatar";
import { useEffect, useState } from "react";

export type participantAvatar = {
  id: number;
  name: string;
  image?: string;
};

interface AvartarListProps {
  participantCount: number;
  participantAvatars: participantAvatar[];
}

export const AvartarList = ({
  participantCount,
  participantAvatars,
}: AvartarListProps) => {
  console.log("✅ participantAvatars:", participantAvatars);

  const [displayparticipantAvatars, setDisaplayparticipantAvatars] =
    useState(participantAvatars); // 프로필 사진이 보여지는 사용자 리스트
  const [overNumber, setOverNumber] = useState(0); // 5명 이상일 경우, 숫자로 표기되는 인원 수
  useEffect(() => {
    if (participantCount > 5) {
      setDisaplayparticipantAvatars(participantAvatars.slice(0, 4));
      setOverNumber(participantCount - 4);
    }
  }, [participantAvatars]);

  return (
    <div className="flex -space-x-2.5">
      {displayparticipantAvatars.map((participant) => (
        <Avatar
          key={participant.id}
          username={participant.name}
          className="h-[30px] w-[30px]"
          src={participant.image}
        />
      ))}

      {/* 5명 이상일 경우, 숫자로 표기되는 인원 수  */}
      {participantCount > 5 && (
        <div className="bg-secondary-100 text-secondary-800 flex h-[30px] w-[30px] items-center justify-center rounded-full text-sm font-semibold">
          +{overNumber}
        </div>
      )}
    </div>
  );
};
