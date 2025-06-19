import React from "react";

export const GatheringDetailSkeleton = () => {
  return (
    <div className="flex h-fit flex-col items-center">
      <div className="bg-secondary-50 flex h-full min-h-screen w-full max-w-[1200px] flex-col items-center px-4 pt-6 sm:px-6 sm:pt-6.5 md:pt-10">
        {/* 이미지 및 상세정보 스켈레톤 */}
        <div className="grid w-full max-w-[996px] grid-rows-2 gap-4 sm:grid-cols-2 sm:grid-rows-1 md:gap-6">
          {/* 이미지 스켈레톤 */}
          <div className="relative h-[280px] w-full animate-pulse overflow-hidden rounded-3xl bg-gray-200">
            {/* DeadlineTag 스켈레톤 */}
            <div className="absolute top-4 right-4 h-8 w-24 animate-pulse rounded-full bg-gray-300"></div>
          </div>

          {/* GatheringInformation 스켈레톤 */}
          <div className="relative flex h-70 w-full flex-col rounded-3xl border-2 border-gray-200 bg-white px-6 py-6">
            {/* 찜하기 버튼 스켈레톤 */}
            <div className="absolute top-6 right-6">
              <div className="h-6 w-6 animate-pulse rounded bg-gray-200"></div>
            </div>

            {/* 상세 정보 스켈레톤 */}
            <div className="relative flex w-fit grow flex-col">
              {/* 제목 */}
              <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200"></div>

              {/* 날짜 및 시간 칩들 */}
              <div className="mt-1 flex gap-x-2">
                <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200"></div>
                <div className="h-6 w-14 animate-pulse rounded-full bg-gray-200"></div>
              </div>

              {/* 모임 장소 및 모집 마감 */}
              <div className="mt-3.5 flex flex-col gap-0.5">
                <div className="flex items-center">
                  <div className="bg-primary-100 mr-1.5 h-4 w-16 animate-pulse rounded"></div>
                  <div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>
                </div>
                <div className="flex items-center">
                  <div className="bg-primary-100 mr-1.5 h-4 w-16 animate-pulse rounded"></div>
                  <div className="h-4 w-40 animate-pulse rounded bg-gray-200"></div>
                </div>
              </div>
            </div>

            {/* 구분선 */}
            <hr className="-mx-6 my-4 border-t-2 border-dashed border-gray-200" />

            {/* 참여 인원 정보 스켈레톤 */}
            <div className="flex flex-col">
              {/* 참가자 수 텍스트 */}
              <div className="mb-3 h-4 w-24 animate-pulse rounded bg-gray-200"></div>

              {/* 아바타 리스트 */}
              <div className="h-2 w-full animate-pulse rounded bg-gray-200"></div>
            </div>
          </div>
        </div>

        {/* 리뷰 섹션 스켈레톤 */}
        <div className="border-t-secondary-200 mt-4 flex w-full max-w-[996px] grow flex-col border-t-2 bg-white px-7 pt-7 pb-28 sm:mt-5 md:mt-6">
          <div className="mb-6 h-6 w-64 animate-pulse rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};
