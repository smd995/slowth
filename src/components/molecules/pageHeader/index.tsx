import { PageHeaderIcon } from "@/components/icons/PageHeaderIcon";

export const PageHeader = () => {
  return (
    <div className="mb-8 flex items-center gap-6">
      {/* 아이콘 - 원형 배경 포함 */}
      <div className="bg-primary-50 flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full border-2 border-gray-800">
        <PageHeaderIcon />
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col justify-center">
        <p className="text-secondary-700 mb-2">함께 할 사람이 없나요?</p>
        <h3 className="text-secondary-900 text-lg leading-none font-semibold sm:text-2xl">
          지금 모임에 참여해보세요
        </h3>
      </div>
    </div>
  );
};
