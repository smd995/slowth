import { Gathering } from "./gathering";
import { User } from "./user";
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
  // User 타입은 추후 별도 추가 후 수정 필요
  User: Pick<User, "teamId" | "id" | "name" | "image">;
}

export interface ReviewList {
  data: ReviewDetail[];
  totalItemCount: number;
  currentPage: number;
  totalPages: number;
}
