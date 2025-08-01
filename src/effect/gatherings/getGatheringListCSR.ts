// CSR 전용 모임 리스트 API 호출 함수
// axios client를 사용하여 클라이언트에서만 호출됩니다.

import { client } from "@/shared/api";
import type { Gathering } from "@/entity/gathering";

export const getGatheringListCSR = async (
  offset: number,
  limit: number,
  filters?: {
    region?: string;
    date?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    type?: string;
  },
  signal?: AbortSignal,
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

  // axios client 사용 (CSR 전용)
  const response = await client.get(`/gatherings?${params.toString()}`, {
    signal,
  });

  return response.data; // 클라이언트 필터링 제거 - API에서 처리
};
