import { client } from "@/shared/api";
import {
  CreateReviewRequest,
  GetReviewsParams,
  GetScoresParams,
  ReviewList,
  Scores,
} from "../model/types";

// 리뷰 생성
export const createReview = async (reviewData: CreateReviewRequest) => {
  try {
    const response = await client.post(`/reviews`, reviewData);
    return response.data;
  } catch (error) {
    console.error("createReview 실패:", error);
    throw error;
  }
};

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

// 점수 조회
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
