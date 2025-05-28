const BASE_URL = "https://fe-adv-project-together-dallaem.vercel.app";
const teamId = "slotest";

export const getGatheringList = async () => {
  const response = await fetch(`${BASE_URL}/${teamId}/gatherings`);
  if (!response.ok) {
    throw new Error("모임 목록을 불러오는 데 실패했습니다");
  }
  return await response.json();
};
