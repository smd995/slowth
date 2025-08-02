import Image from "next/image";
import dayjs from "dayjs";
import { StatusChip } from "@/components/atom/statusChip";
import { User } from "lucide-react";
import { Button } from "@/shared/ui";
import type { JoinedGathering } from "@/entities/gathering";

interface GatheringCardProps {
  gathering: JoinedGathering;
  onCancel: () => void;
  onReview: () => void;
  onRouter: () => void;
}

export const VerticalMyGatheringCard = ({
  gathering,
  onCancel,
  onReview,
  onRouter,
}: GatheringCardProps) => {
  return (
    <div className="relative min-w-[311px]">
      {gathering.canceledAt && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-black px-4 py-6 opacity-80">
          <div className="text-center">
            <p className="mb-1 text-white">모집 취소된 모임이예요.</p>
            <p className="mb-4 text-white">다음 기회에 만나요 🙏</p>
            <Button variant="primary" size="sm" className="h-9 w-[116px]">
              👏 <p className="text-xs font-semibold">모임 보내주기</p>
            </Button>
          </div>
        </div>
      )}
      <div className="flex flex-col space-y-6">
        <div className="relative h-[156px] w-full overflow-hidden rounded-3xl bg-gray-200">
          <Image
            onClick={onRouter}
            src={gathering.image || "/image/alt-place.jpg"}
            alt={gathering.name}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="cursor-pointer object-cover"
            fill
          />
        </div>

        {/* 개설 확정은 참여인원수가 최소인원(5명)을 충족한 경우 */}
        {/* 이용 완료는 모임날짜가 지났을 때 */}
        <div className="mb-3 flex items-center gap-2">
          {dayjs(gathering.dateTime).isBefore(dayjs()) && (
            <StatusChip status="completed" />
          )}
          {dayjs(gathering.dateTime).isAfter(dayjs()) &&
            gathering.participantCount < 5 && (
              <>
                <StatusChip status="scheduled" />
                <StatusChip status="pending" />
              </>
            )}
          {dayjs(gathering.dateTime).isAfter(dayjs()) &&
            gathering.participantCount >= 5 && (
              <>
                <StatusChip status="scheduled" />
                <StatusChip status="confirmed" />
              </>
            )}
        </div>

        <div>
          <div className="my-2 flex items-center gap-2">
            <h4 className="text-secondary-900 truncate text-lg font-semibold">
              {gathering.name} |{" "}
            </h4>
            <p className="text-secondary-700 text-sm font-medium">
              {gathering.location}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <p>{dayjs(gathering.dateTime).format("M월 D일 · HH:mm")}</p>
            <div className="flex items-center gap-1">
              <User className="size-4" fill="currentColor" />
              <p>
                {gathering.participantCount}/{gathering.capacity}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          {!gathering.isCompleted && (
            <Button
              onClick={onCancel}
              variant="outline"
              size="md"
              className="w-30"
            >
              예약 취소하기
            </Button>
          )}

          {gathering.isCompleted && (
            <Button
              onClick={onReview}
              variant="primary"
              size="md"
              className="w-30"
            >
              리뷰 작성하기
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
