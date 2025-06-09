import { ReviewHeaderIcon } from "@/components/icons/ReviewHeaderIcon";
import { RatingOverview } from "@/components/organisms/ratingOverview";
import { ReviewsWithInfiniteScroll } from "@/components/organisms/reviewsWithInfiniteScroll";
import { getReviews } from "@/effect/reviews/getReviews";
import { getScores } from "@/effect/reviews/getScores";
// import { type Tab } from "@/components/atom/tabs";

export default async function ReviewsPage() {
  // // 상위 탭
  // const topTabs: Tab[] = [
  //   { label: "달램핏", value: "DALLAEMFIT", icon: "meditation" },
  //   { label: "워케이션", value: "WORKATION", icon: "vacation" },
  // ];

  // // 하위 탭
  // const subTabs: Record<string, { label: string; value: string }[]> = {
  //   DALLAEMFIT: [
  //     { label: "오피스 스트레칭", value: "OFFICE_STRETCHING" },
  //     { label: "마인드풀니스", value: "MINDFULNESS" },
  //   ],
  //   WORKATION: [], // 워케이션은 하위 카테고리 없음
  // };

  const scores = await getScores({});
  const reviews = await getReviews({});

  return (
    <main className="flex flex-col items-center bg-gray-100">
      <h2 className="sr-only">모든 리뷰</h2>
      <section className="bg-secondary-50 flex h-full min-h-screen w-full max-w-[1200px] flex-col gap-4 px-4 py-6 sm:gap-6 sm:px-6 sm:py-6.5 md:px-[100px] md:py-10">
        <div className="mb-8 flex items-center gap-6">
          {/* 아이콘 - 원형 배경 포함 */}
          <div className="bg-primary-50 flex h-18 w-18 shrink-0 items-center justify-center rounded-full border-2 border-gray-800 pl-0.5">
            <ReviewHeaderIcon />
          </div>

          {/* 텍스트 영역 */}
          <div className="flex flex-col justify-center">
            <h3 className="text-secondary-900 text-lg leading-none font-semibold sm:text-2xl">
              모든 리뷰
            </h3>
            <p className="text-secondary-700 mt-2">
              같이달램을 이용한 분들은 이렇게 느꼈어요 🫶
            </p>
          </div>
        </div>

        <div>
          <RatingOverview scores={scores?.[0]} />
        </div>
        <ReviewsWithInfiniteScroll initialReviews={reviews.data} />
      </section>
    </main>
  );
}
