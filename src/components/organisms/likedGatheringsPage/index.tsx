"use client";
import { LikedHeaderIcon } from "@/components/icons/LikedHeaderIcon";
import { CategoryTab } from "@/components/molecules/categoryTab";
import { GatheringCard } from "@/components/molecules/gatheringCard";
import { SkeletonCard } from "@/components/molecules/gatheringCardSkeleton";
import { DEFAULT_TYPE } from "@/constants/category";
import { Gathering } from "@/entity/gathering";
import { useLikedGatherings } from "@/hooks/api/useLikedGatherings";
import { isPastNow } from "@/libs/date/isPastNow";
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
    <main className="flex flex-col items-center">
      <h2 className="sr-only">찜한 모임</h2>
      <section
        style={{ minHeight: "calc(100vh - 60px)" }}
        className="bg-secondary-50 flex h-full min-h-screen w-full max-w-[1200px] flex-col px-4 pt-6 sm:px-6 sm:pt-6.5 md:px-[100px] md:py-10"
      >
        <div className="mb-8 flex items-center gap-6">
          {/* 아이콘 - 원형 배경 포함 */}
          <div className="bg-primary-50 flex h-18 w-18 shrink-0 items-center justify-center rounded-full border-2 border-gray-800 pl-0.5">
            <LikedHeaderIcon />
          </div>

          {/* 텍스트 영역 */}
          <div className="flex flex-col justify-center">
            <h3 className="text-secondary-900 text-lg leading-none font-semibold sm:text-2xl">
              찜한 모임
            </h3>
            <p className="text-secondary-700 mt-2">
              마감되기 전에 지금 바로 참여해보세요 👀
            </p>
          </div>
        </div>

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
      </section>
    </main>
  );
};
