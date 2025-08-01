import { client } from "@/shared/api";

interface CreateReviewRequest {
  gatheringId: number;
  score: number;
  comment: string;
}

export const createReview = async (reviewData: CreateReviewRequest) => {
  try {
    const response = await client.post(`/reviews`, reviewData);
    return response.data;
  } catch (error) {
    console.error("createReview 실패:", error);
    throw error;
  }
};
