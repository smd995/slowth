import { ReviewList } from "@/entity/review";

interface GetReviewsParams {
  gatheringId?: string;
  userId?: number;
  type?: string;
  location?: string;
  date?: string; // YYYY-MM-DD
  registrationEnd?: string; // YYYY-MM-DD
  sortBy?: "createdAt" | "score" | "participantCount";
  sortOrder?: "asc" | "desc";
  limit?: number;
  offset?: number;
}

// 리뷰 목록 조회
export const getReviews = async (
  getReviewsParams: GetReviewsParams,
): Promise<ReviewList> => {
  try {
    const rawParams = {
      ...getReviewsParams,
      limit: getReviewsParams.limit ?? 10, // undefined 인 경우 기본값 10 적용
      offset: getReviewsParams.offset ?? 0, // undefined 인 경우 기본값 0 적용
    };
    const urlParams = new URLSearchParams();

    Object.entries(rawParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        urlParams.append(key, value.toString());
      }
    });

    const url = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/reviews?${urlParams.toString()}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch reviews. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("getReviews error:", error);
    throw error;
  }
};
