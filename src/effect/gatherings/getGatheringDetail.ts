import { Participant } from "@/entity/participant";

const BASE_URL = "https://fe-adv-project-together-dallaem.vercel.app";
const teamId = "slotest";

// 모임 상세 조회
export const getGatheringDetail = async (id: string) => {
  // 추후 에러 고려하여 404 처리 추가해주기
  try {
    const response = await fetch(`${BASE_URL}/${teamId}/gatherings/${id}`);
    const data = await response.json();

    // 응답이 404 에러인 경우
    if (response.status === 404 || data?.code === "NOT_FOUND") {
      return null;
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
    `${BASE_URL}/${teamId}/gatherings/${id}/participants`,
  );
  const data = await response.json();

  const participantAvatars = data.map((p: Participant) => ({
    id: p.User.id,
    name: p.User.name,
    image: p.User.image,
  }));

  return participantAvatars;
};
