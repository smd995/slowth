import { client } from "@/shared/api";

export const cancelGathering = async (id: number) => {
  const response = await client.put(`gatherings/${id}/cancel`);
  return response.data;
};
