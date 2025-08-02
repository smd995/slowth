import { getGatheringDetail as getGatheringInfo } from "@/entities/gathering";
import { getReviews } from "@/effect/reviews/getReviews";
import { notFound } from "next/navigation";
import { GatheringDetailPage } from "@/components/organisms/gatheringDetailPage";
import { SWRConfig } from "swr";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    // 서버에서 초기 데이터 fetch
    const [gatheringData, reviewList] = await Promise.all([
      getGatheringInfo(id),
      getReviews({ gatheringId: id, limit: 4 }),
    ]);

    // SWR fallback 데이터 준비
    const fallbackData = {
      [`gathering-with-participants-${id}`]: gatheringData,
    };

    return (
      <>
        <link
          rel="preload"
          as="image"
          href={gatheringData.gathering.image || "/image/alt-place.jpg"}
        />
        <SWRConfig value={{ fallback: fallbackData }}>
          <GatheringDetailPage gatheringId={id} reviewList={reviewList} />
        </SWRConfig>
      </>
    );
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "GatheringNotFoundError") {
      notFound();
    }
    throw error;
  }
}
