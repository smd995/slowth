import client from "../client/client";

// 모임 참여하기
export const joinGathering = async (id: number) => {
  const response = await client.post(`gatherings/${id}/join`);
  return response.data;
};
