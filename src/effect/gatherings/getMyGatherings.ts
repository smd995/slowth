import { client } from "@/shared/api";

interface GetMyGatheringsOptions {
  limit: number;
  offset: number;
  completed?: boolean;
  reviewed?: boolean;
  sortBy?: "dateTime" | "registrationEnd" | "joinedAt";
  sortOrder?: "asc" | "desc";
}

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
