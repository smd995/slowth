"use client";
import { CategoryTab } from "@/components/molecules/categoryTab";
import { GatheringCard } from "@/components/molecules/gatheringCard";
import { SkeletonCard } from "@/components/molecules/gatheringCardSkeleton";
import { PageHeader } from "@/components/molecules/pageHeader";
import { DEFAULT_TYPE } from "@/shared/config";
import { Gathering } from "@/entity/gathering";
import { useLikedGatherings } from "@/hooks/api/useLikedGatherings";
import { isPastNow } from "@/shared/lib";
import { useEffect, useState } from "react";

export const LikedGatheringPage = () => {
  const [selectedType, setSelectedType] = useState(DEFAULT_TYPE);
  const { gatherings, isLoading, error } = useLikedGatherings();
  const [selectedGatherings, setSelectedGatherings] =
    useState<Gathering[]>(gatherings);

  useEffect(() => {
    if (error) {
      console.error("찜한 모임 로딩 중 에러 발생 :", error);
    }
    if (selectedType === DEFAULT_TYPE) {
      setSelectedGatherings(
        gatherings.filter(
          (gathering) =>
            gathering.type === "OFFICE_STRETCHING" ||
            gathering.type === "MINDFULNESS",
        ),
      );
      return;
    }
    setSelectedGatherings(
      gatherings.filter((gathering) => gathering.type === selectedType),
    );
  }, [selectedType, gatherings, error]);

  return (
    <div className="flex flex-col">
      <h2 className="sr-only">찜한 모임</h2>
      <main
        style={{ minHeight: "calc(100vh - 60px)" }}
        className="flex h-full min-h-screen flex-col"
      >
        <PageHeader page="liked" />

        <CategoryTab setSelectedType={setSelectedType} />

        <div className="border-secondary-200 mt-4 flex w-full grow flex-col gap-4 border-t-2 pt-3 sm:pt-4">
          {!isLoading && selectedGatherings.length === 0 ? (
            <div className="flex w-full flex-1 items-center justify-center">
              <p className="text-secondary-500">아직 찜한 모임이 없어요</p>
            </div>
          ) : (
            <>
              {selectedGatherings.map((gathering, index) => (
                <GatheringCard
                  key={`${gathering.id}-${index}`}
                  gathering={gathering}
                  isDimmed={isPastNow(gathering.dateTime)}
                  onClick={() => console.log(gathering.id)}
                />
              ))}
            </>
          )}

          {/* 로딩 중일 때 스켈레톤 UI 표시 */}
          {selectedGatherings.length === 0 && isLoading && (
            <div className="flex flex-col gap-4">
              {[...Array(6)].map((_, idx) => (
                <SkeletonCard key={idx} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
