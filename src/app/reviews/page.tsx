import { getReviews, getScores } from "@/entities/review";
import { ReviewPageContent } from "@/components/organisms/reviewPageContent";
import { DEFAULT_TYPE } from "@/shared/config";
import { PageHeader } from "@/components/molecules/pageHeader";
export default async function ReviewsPage() {
  const scores = await getScores({ type: DEFAULT_TYPE });
  const reviews = await getReviews({ type: DEFAULT_TYPE, limit: 10 });

  return (
    <div className="flex flex-col items-center">
      <h2 className="sr-only">모든 리뷰</h2>
      <main className="flex h-full min-h-screen flex-col">
        <PageHeader page="reviews" />
        <div className="flex flex-col gap-y-4">
          <ReviewPageContent
            initalScore={scores[0]}
            initialReviews={reviews.data}
          />
        </div>
      </main>
    </div>
  );
}
