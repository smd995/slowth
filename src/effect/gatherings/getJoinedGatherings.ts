import { JoinedGathering } from "@/entity/gathering";
import { client } from "@/shared/api";

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
  const params = new URLSearchParams();

  Object.entries(getJoinedGatheringsParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, value.toString());
    }
  });
  const response = await client.get(`gatherings/joined?${params}`);
  return response.data;
};
