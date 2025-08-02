import { client } from "@/shared/api";
import { Gathering, JoinedGathering, GatheringFormData } from "../model/types";
// import { Participant } from "@/entity/participant";

// 필터 타입 정의
interface GatheringListFilters {
  region?: string;
  date?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  type?: string;
}

interface GetMyGatheringsOptions {
  limit: number;
  offset: number;
  completed?: boolean;
  reviewed?: boolean;
  sortBy?: "dateTime" | "registrationEnd" | "joinedAt";
  sortOrder?: "asc" | "desc";
}

interface GetJoinedGatheringsParams {
  completed?: boolean;
  reviewed?: boolean;
  limit?: number;
  offset?: number;
  sortBy?: "dateTime" | "registrationEnd" | "joinedAt";
  sortOrder?: "asc" | "desc";
}

// 모임 생성
export const createGathering = async (gathering: GatheringFormData) => {
  try {
    const formData = new FormData();

    // 각 필드를 FormData에 추가
    formData.append("name", gathering.name);
    formData.append("location", gathering.location);
    formData.append("dateTime", gathering.dateTime);
    formData.append("registrationEnd", gathering.registrationEnd);
    formData.append("type", gathering.type);
    formData.append("capacity", gathering.capacity?.toString() || "");

    // 파일이 있는 경우에만 추가 (FileList에서 첫 번째 파일 가져오기)
    if (gathering.image && gathering.image.length > 0) {
      formData.append("image", gathering.image[0]);
    }

    const response = await client.post("/gatherings", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("모임 생성 중 오류:", error);
    throw error;
  }
};

// 모임 상세 조회
export const getGatheringDetail = async (id: string) => {
  // 추후 에러 고려하여 404 처리 추가해주기
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/gatherings/${id}`,
    );
    const data = await response.json();

    // 응답이 404 에러인 경우
    if (response.status === 404 || data?.code === "NOT_FOUND") {
      const error = new Error("Not Found");
      error.name = "GatheringNotFoundError";
      throw error;
    }

    // 기타 서버 오류
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("모임 상세 조회 중 오류:", error);
    throw error;
  }
};

// CSR 전용 모임 리스트 조회
export const getGatheringListCSR = async (
  offset: number,
  limit: number,
  filters?: GatheringListFilters,
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

  return response.data;
};

// SSR 전용 모임 리스트 조회
export const getGatheringListSSR = async (
  offset: number,
  limit: number,
  filters?: GatheringListFilters,
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

  // 서버에서 직접 fetch 사용 (SSR 전용)
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/gatherings?${params.toString()}`,
    {
      next: {
        revalidate: 60, // 1분 캐시
      },
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// 내 모임 조회
export const getMyGatherings = async (options: GetMyGatheringsOptions) => {
  try {
    const params = new URLSearchParams();

    if (options.completed !== undefined) {
      params.append("completed", options.completed.toString());
    }

    if (options.reviewed !== undefined) {
      params.append("reviewed", options.reviewed.toString());
    }

    if (options.limit !== undefined) {
      params.append("limit", options.limit.toString());
    }

    if (options.offset !== undefined) {
      params.append("offset", options.offset.toString());
    }

    if (options.sortBy) {
      params.append("sortBy", options.sortBy);
    }

    if (options.sortOrder) {
      params.append("sortOrder", options.sortOrder);
    }

    const response = await client.get(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/gatherings/joined?${params.toString()}`,
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error("getMyGatherings 실패:", error);
    throw error;
  }
};

// 참여한 모임 조회
export const getJoinedGatherings = async (
  getJoinedGatheringsParams: GetJoinedGatheringsParams,
): Promise<JoinedGathering[]> => {
  const params = new URLSearchParams();

  Object.entries(getJoinedGatheringsParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, value.toString());
    }
  });
  const response = await client.get(`gatherings/joined?${params}`);
  return response.data;
};

// 생성한 모임 조회
export const getCreatedGatherings = async (
  limit: number,
  offset: number,
  createdBy: number,
) => {
  try {
    const params = new URLSearchParams();
    params.append("limit", limit.toString());
    params.append("offset", offset.toString());
    params.append("createdBy", createdBy.toString());

    const response = await client.get(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/gatherings?${params.toString()}`,
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error("getCreatedGatherings 실패:", error);
    throw error;
  }
};

// 모임 참여하기
export const joinGathering = async (id: number) => {
  const response = await client.post(`gatherings/${id}/join`);
  return response.data;
};

// 모임 참여 취소하기
export const leaveGathering = async (id: number) => {
  const response = await client.delete(`gatherings/${id}/leave`);
  return response.data;
};

// 모임 취소
export const cancelGathering = async (id: number) => {
  const response = await client.put(`gatherings/${id}/cancel`);
  return response.data;
};
