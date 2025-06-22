// SSR 전용 모임 리스트 API 호출 함수
// Next.js 확장 fetch를 사용하여 서버에서만 호출됩니다.

import type { Gathering } from "@/entity/gathering";

// API 기본 URL과 팀 ID
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

export const getGatheringListSSR = async (
  offset: number,
  limit: number,
  filters?: {
    region?: string;
    date?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    type?: string;
  },
): Promise<Gathering[]> => {
  const params = new URLSearchParams();
  params.append("offset", offset.toString());
  params.append("limit", limit.toString());

  // 필터 파라미터 추가
  if (filters?.region && filters.region !== "all") {
    params.append("location", filters.region);
  }
  if (filters?.date) {
    params.append("date", filters.date);
  }
  if (filters?.sortBy) {
    params.append("sortBy", filters.sortBy);
  }
  if (filters?.sortOrder) {
    params.append("sortOrder", filters.sortOrder);
  }
  if (filters?.type) {
    params.append("type", filters.type);
  }

  // Next.js 확장 fetch 사용 (SSR 전용)
  const response = await fetch(
    `${BASE_URL}/${TEAM_ID}/gatherings?${params.toString()}`,
    {
      cache: "no-store", // 항상 최신 데이터
    },
  );

  if (!response.ok) {
    throw new Error("모임 목록을 불러오는 데 실패했습니다");
  }

  const data: Gathering[] = await response.json();
  return data; // 클라이언트 필터링 제거 - API에서 처리
};
