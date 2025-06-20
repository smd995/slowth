import { getReviews } from "@/effect/reviews/getReviews";
import { getScores } from "@/effect/reviews/getScores";
import { ReviewPageContent } from "@/components/organisms/reviewPageContent";
import { DEFAULT_TYPE } from "@/constants/category";
import { PageHeader } from "@/components/molecules/pageHeader";
export default async function ReviewsPage() {
  const scores = await getScores({ type: DEFAULT_TYPE });
  const reviews = await getReviews({ type: DEFAULT_TYPE, limit: 10 });

  return (
    <main className="flex flex-col items-center bg-gray-100">
      <h2 className="sr-only">모든 리뷰</h2>
      <section className="bg-secondary-50 flex h-full min-h-screen w-full max-w-[1200px] flex-col gap-4 px-4 pt-6 sm:gap-6 sm:px-6 sm:pt-6.5 md:px-[100px] md:py-10">
        <PageHeader page="reviews" />

        <ReviewPageContent
          initalScore={scores[0]}
          initialReviews={reviews.data}
        />
      </section>
    </main>
  );
}
