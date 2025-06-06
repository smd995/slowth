import client from "../client/client";

// 모임 참여 취소하기
export const leaveGathering = async (id: number) => {
  const response = await client.delete(`gatherings/${id}/leave`);
  return response.data;
};
