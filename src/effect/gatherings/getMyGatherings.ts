import client from "../client/client";

export const getMyGatherings = async (limit: number, offset: number) => {
  try {
    const params = new URLSearchParams();
    params.append("limit", limit.toString());
    params.append("offset", offset.toString());

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
