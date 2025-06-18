"use client";

export const SkeletonCard = () => {
  return (
    <div className="border-secondary-200 flex h-[332px] animate-pulse flex-col overflow-hidden rounded-3xl border-2 bg-white shadow-sm sm:h-[160px] sm:flex-row">
      {/* 모바일: 전체를 채우는 둥근 사각형 / PC: 좌측 이미지 영역 */}
      <div className="bg-secondary-300 h-full w-full sm:w-72" />

      {/* PC에서만 보이는 텍스트 영역 */}
      <div className="hidden flex-1 flex-col space-y-3 p-4 sm:flex sm:pt-4 sm:pr-4 sm:pb-4 sm:pl-6">
        <div className="bg-secondary-200 h-6 w-1/2 rounded" />
        <div className="bg-secondary-200 mt-2 h-4 w-3/4 rounded" />
        <div className="bg-secondary-200 h-4 w-2/3 rounded" />
        <div className="bg-secondary-200 h-4 w-5/6 rounded" />
      </div>
    </div>
  );
};
