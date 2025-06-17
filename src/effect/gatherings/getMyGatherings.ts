export const getMyGatherings = async (
  limit: number,
  offset: number,
  createdBy: number,
) => {
  try {
    const params = new URLSearchParams();
    params.append("limit", limit.toString());
    params.append("offset", offset.toString());
    params.append("createdBy", createdBy.toString());

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/gatherings?${params.toString()}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("getMyGatherings 실패:", error);
    throw error;
  }
};
