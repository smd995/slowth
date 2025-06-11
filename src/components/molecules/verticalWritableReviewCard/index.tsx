import Image from "next/image";
import dayjs from "dayjs";
import { User } from "lucide-react";
import { Button } from "@/components/atom/button";
import type { JoinedGathering } from "@/entity/gathering";

interface VerticalWritableReviewCardProps {
  gathering: JoinedGathering;
  onReview: () => void;
}

export const VerticalWritableReviewCard = ({
  gathering,
  onReview,
}: VerticalWritableReviewCardProps) => {
  return (
    <div className="relative min-w-[311px]">
      <div className="flex flex-col space-y-6">
        <div className="relative h-[156px] w-[311px] overflow-hidden rounded-3xl bg-gray-200">
          <Image
            src={gathering.image || "/image/alt-place.jpg"}
            alt={gathering.name}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            fill
          />
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
          <Button
            onClick={onReview}
            variant="primary"
            size="md"
            className="w-30"
          >
            리뷰 작성하기
          </Button>
        </div>
      </div>
    </div>
  );
};
