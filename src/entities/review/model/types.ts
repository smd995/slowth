import { Gathering } from "@/entities/gathering";
import { User } from "@/entities/user";

// Review(리뷰) 기본 타입
export interface Review {
  teamId: number;
  id: number;
  score: number;
  comment: string;
  createdAt: string;
}

// ReviewDetail(리뷰 상세) 타입
export interface ReviewDetail extends Review {
  Gathering: Pick<
    Gathering,
    "teamId" | "id" | "type" | "name" | "dateTime" | "location" | "image"
  >;
  User: Pick<User, "teamId" | "id" | "name" | "image">;
}

// 리뷰 목록 응답 타입
export interface ReviewList {
  data: ReviewDetail[];
  totalItemCount: number;
  currentPage: number;
  totalPages: number;
}

// Scores(점수 통계) 타입
export interface Scores {
  teamId: number;
  gatheringId: number;
  type: string;
  averageScore: number;
  oneStar: number;
  twoStars: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
}

// 점수 요약 타입
export interface ScoreSummary {
  totalCount: number;
  scoreList: number[];
}

// API 파라미터 타입들
export interface CreateReviewRequest {
  gatheringId: number;
  score: number;
  comment: string;
}

export interface GetReviewsParams {
  gatheringId?: string;
  userId?: number;
  type?: string;
  location?: string;
  date?: string; // YYYY-MM-DD
  registrationEnd?: string; // YYYY-MM-DD
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  limit?: number;
  offset?: number;
}

export interface GetScoresParams {
  gatheringId?: string;
  type?: string;
}
