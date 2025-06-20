import { LikedHeaderIcon } from "@/components/icons/LikedHeaderIcon";
import { PageHeaderIcon } from "@/components/icons/PageHeaderIcon";
import { ReviewHeaderIcon } from "@/components/icons/ReviewHeaderIcon";
import clsx from "clsx";
interface PageHeaderProps {
  page: "main" | "liked" | "reviews";
}

export const PageHeader = ({ page }: PageHeaderProps) => {
  const HeaderIcon = {
    main: <PageHeaderIcon />,
    liked: <LikedHeaderIcon />,
    reviews: <ReviewHeaderIcon />,
  };

  const headerTitle = {
    main: "지금 모임에 참여해보세요",
    liked: "찜한 모임",
    reviews: "모든 리뷰",
  };

  const headerText = {
    main: "함께 할 사람이 없나요?",
    liked: "마감되기 전에 지금 바로 참여해보세요 👀",
    reviews: "같이달램을 이용한 분들은 이렇게 느꼈어요 🫶",
  };

  const headerTitleStyle =
    "text-secondary-900 text-lg leading-none font-semibold sm:text-2xl";
  const headerTextStyle = "text-secondary-700";
  return (
    <div className="mb-8 flex items-center gap-6">
      {/* 아이콘 - 원형 배경 포함 */}
      <div className="bg-primary-50 flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full border-2 border-gray-800">
        {HeaderIcon[page]}
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col justify-center">
        {page === "main" ? (
          <>
            <p className={headerTextStyle}>{headerText[page]}</p>
            <h3 className={clsx(headerTitleStyle, "mt-2")}>
              {headerTitle[page]}
            </h3>
          </>
        ) : (
          <>
            <h3 className={headerTitleStyle}>{headerTitle[page]}</h3>
            <p className={clsx(headerTextStyle, "mt-2")}>{headerText[page]}</p>
          </>
        )}
      </div>
    </div>
  );
};
