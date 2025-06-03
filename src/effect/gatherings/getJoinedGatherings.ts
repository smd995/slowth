// 로그인된 사용자가 참석한 모임 목록 조회

import { JoinedGathering } from "@/entity/gathering";

interface GetJoinedGatheringsParams {
  completed?: boolean;
  reviewed?: boolean;
  limit?: number;
  offset?: number;
  sortBy?: "dateTime" | "registrationEnd" | "joinedAt";
  sortOrder?: "asc" | "desc";
}

export const getJoinedGatherings = async (
  getJoinedGatheringsParams: GetJoinedGatheringsParams,
): Promise<JoinedGathering[]> => {
  const token = localStorage.getItem("token");
  const params = new URLSearchParams();

  Object.entries(getJoinedGatheringsParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, value.toString());
    }
  });
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/gatherings/joined`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "사용자가 참석한 모임 목록 조회에 실패했습니다.",
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("사용자가 참석한 모임 목록 조회 중 오류:", error);
    throw error;
  }
};
