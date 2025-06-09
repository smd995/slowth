import { Scores } from "@/entity/scores";

interface GetScoresParams {
  gatheringId?: string;
  type?: string;
}

// 리뷰 목록 조회
export const getScores = async (
  getScoresParams: GetScoresParams,
): Promise<Scores[]> => {
  try {
    const params = new URLSearchParams();

    Object.entries(getScoresParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    const url = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/reviews/scores?${params.toString()}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch reviews. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("getScores error:", error);
    throw error;
  }
};
