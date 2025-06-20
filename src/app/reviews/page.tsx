import { getReviews } from "@/effect/reviews/getReviews";
import { getScores } from "@/effect/reviews/getScores";
import { ReviewPageContent } from "@/components/organisms/reviewPageContent";
import { DEFAULT_TYPE } from "@/constants/category";
import { PageHeader } from "@/components/molecules/pageHeader";
export default async function ReviewsPage() {
  const scores = await getScores({ type: DEFAULT_TYPE });
  const reviews = await getReviews({ type: DEFAULT_TYPE, limit: 10 });

  return (
    <div className="flex flex-col items-center">
      <h2 className="sr-only">모든 리뷰</h2>
      <main className="flex h-full min-h-screen flex-col gap-4">
        <PageHeader page="reviews" />

        <ReviewPageContent
          initalScore={scores[0]}
          initialReviews={reviews.data}
        />
      </main>
    </div>
  );
}
