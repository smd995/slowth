import { ReviewHeaderIcon } from "@/components/icons/ReviewHeaderIcon";
import { getReviews } from "@/effect/reviews/getReviews";
import { getScores } from "@/effect/reviews/getScores";
import { ReviewPageContent } from "@/components/organisms/reviewPageContent";
import { DEFAULT_TYPE } from "@/constants/category";
export default async function ReviewsPage() {
  const scores = await getScores({ type: DEFAULT_TYPE });
  const reviews = await getReviews({ type: DEFAULT_TYPE, limit: 10 });

  return (
    <main className="flex flex-col items-center bg-gray-100">
      <h2 className="sr-only">모든 리뷰</h2>
      <section className="bg-secondary-50 flex h-full min-h-screen w-full max-w-[1200px] flex-col gap-4 px-4 pt-6 sm:gap-6 sm:px-6 sm:pt-6.5 md:px-[100px] md:py-10">
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
        <ReviewPageContent
          initalScore={scores[0]}
          initialReviews={reviews.data}
        />
      </section>
    </main>
  );
}
