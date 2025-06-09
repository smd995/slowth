// 모임 리스트 API 호출 함수
// offset과 limit을 기반으로 페이징된 데이터를 요청합니다.

import type { Gathering } from "@/entity/gathering";

// API 기본 URL과 팀 ID
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

export const getGatheringList = async (
  offset: number,
  limit: number,
  filters?: {
    region?: string; // 지역 필터
    date?: string; // 날짜 필터
    sortBy?: string; // 정렬 기준 필드명
    sortOrder?: "asc" | "desc"; // 정렬 순서
    type?: string; // 모임 타입(상위/하위 카테고리)
  },
) => {
  const params = new URLSearchParams();
  params.append("offset", offset.toString());
  params.append("limit", limit.toString());

  // 선택한 지역 필터 추가
  if (filters?.region && filters.region !== "all") {
    params.append("location", filters.region);
  }
  // 선택한 날짜 필터 추가
  if (filters?.date) {
    params.append("date", filters.date);
  }
  // 선택한 정렬 필드 추가
  if (filters?.sortBy) {
    params.append("sortBy", filters.sortBy);
  }
  // 선택한 정렬 순서 추가
  if (filters?.sortOrder) {
    params.append("sortOrder", filters.sortOrder);
  }
  // 선택한 모임 타입 필터 추가
  if (filters?.type) {
    params.append("type", filters.type);
  }
  // API 호출
  const response = await fetch(
    `${BASE_URL}/${TEAM_ID}/gatherings?${params.toString()}`,
    {
      cache: "no-store", // 캐시를 사용하지 않고 항상 최신 데이터를 가져옴
    },
  );

  if (!response.ok) {
    throw new Error("모임 목록을 불러오는 데 실패했습니다");
  }

  // 받아온 데이터
  const data: Gathering[] = await response.json();
  const now = new Date(); // 현재 시각
  // 취소되지 않았고, 현재 시각 이후에 열리는 모임만 필터링
  return data.filter(
    (item) => item.canceledAt === null && new Date(item.dateTime) > now,
  );
};
