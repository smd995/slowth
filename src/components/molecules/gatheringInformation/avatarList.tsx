import { Avatar } from "@/shared/ui";

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
  const displayparticipantAvatars =
    participantCount > 5 ? participantAvatars.slice(0, 4) : participantAvatars;

  const overNumber = participantCount > 5 ? participantCount - 4 : 0;

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
        <div className="bg-secondary-100 text-secondary-800 z-10 flex h-[30px] w-[30px] items-center justify-center rounded-full text-sm font-semibold">
          +{overNumber}
        </div>
      )}
    </div>
  );
};
