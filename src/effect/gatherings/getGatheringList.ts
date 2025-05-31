// 모임 리스트 API 호출 함수
// offset과 limit을 기반으로 페이징된 데이터를 요청합니다.

import type { Gathering } from "@/entity/gathering";

const BASE_URL = "https://fe-adv-project-together-dallaem.vercel.app";
const TEAM_ID = "slotest";

export const getGatheringList = async (offset: number, limit: number) => {
  const response = await fetch(
    `${BASE_URL}/${TEAM_ID}/gatherings?offset=${offset}&limit=${limit}&sortBy=dateTime&sortOrder=desc`,
    {
      cache: "no-store",
    },
  );
  if (!response.ok) {
    throw new Error("모임 목록을 불러오는 데 실패했습니다");
  }
  const data: Gathering[] = await response.json();
  return data.filter((item) => item.canceledAt === null); // 타입 추론됨
};
