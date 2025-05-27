import { ReviewList } from "@/entity/review";
const BASE_URL = "https://fe-adv-project-together-dallaem.vercel.app";
const teamId = "slotest";

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
export const getReviews = async ({
  gatheringId,
  userId,
  type,
  location,
  date,
  registrationEnd,
  sortBy,
  sortOrder,
  limit = 10,
  offset = 0,
}: GetReviewsParams): Promise<ReviewList> => {
  try {
    const params = new URLSearchParams();

    if (gatheringId !== undefined) params.append("gatheringId", gatheringId);
    if (userId !== undefined) params.append("userId", userId.toString());
    if (type) params.append("type", type);
    if (location) params.append("location", location);
    if (date) params.append("date", date);
    if (registrationEnd) params.append("registrationEnd", registrationEnd);
    if (sortBy) params.append("sortBy", sortBy);
    if (sortOrder) params.append("sortOrder", sortOrder);
    if (limit !== undefined) params.append("limit", limit.toString());
    if (offset !== undefined) params.append("offset", offset.toString());

    const url = `${BASE_URL}/${teamId}/reviews?${params.toString()}`;

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
