// 모임 리스트 API 호출 함수
// offset과 limit을 기반으로 페이징된 데이터를 요청합니다.

import type { Gathering } from "@/entity/gathering";

const BASE_URL = "https://fe-adv-project-together-dallaem.vercel.app";
const TEAM_ID = "slotest";

export const getGatheringList = async (
  offset: number,
  limit: number,
  filters?: {
    region?: string;
    date?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    type?: string;
  },
) => {
  const params = new URLSearchParams();
  params.append("offset", offset.toString());
  params.append("limit", limit.toString());

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

  const response = await fetch(
    `${BASE_URL}/${TEAM_ID}/gatherings?${params.toString()}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("모임 목록을 불러오는 데 실패했습니다");
  }

  const data: Gathering[] = await response.json();
  return data.filter((item) => item.canceledAt === null);
};
