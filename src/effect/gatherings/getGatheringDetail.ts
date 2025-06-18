import { Participant } from "@/entity/participant";

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
      throw new Error(`서버 오류 발생: ${response.status}`);
    }
    return data;
  } catch (error) {
    console.error("getGatheringDetail 실패:", error);
    throw error;
  }
};

// 특정 모임의 참가자 목록 조회
export const getParticipants = async (id: string) => {
  // 추후 에러 고려하여 404 처리 추가해주기
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/gatherings/${id}/participants`,
  );
  const data = await response.json();

  const participantAvatars = data.map((p: Participant) => ({
    id: p.User.id,
    name: p.User.name,
    image: p.User.image,
  }));

  return participantAvatars;
};

// 모임 상세 정보와 참가자 목록을 함께 가져오는 함수
export const getGatheringInfo = async (id: string) => {
  try {
    // 두 API를 병렬로 호출
    const [gathering, participants] = await Promise.all([
      getGatheringDetail(id),
      getParticipants(id),
    ]);

    return {
      gathering,
      participants,
    };
  } catch (error) {
    console.error("getGatheringInfo 실패:", error);
    throw error;
  }
};
