// 모임 취소하기 (주최자만 가능)
export const cancelGathering = async (id: number) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/gatherings/${id}/cancel`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "모임 취소에 실패했습니다.");
    }

    const data = await response.json();
    // console.log("✅ cancelGathering data:", data);

    if (!data.canceledAt) return false;
    return true; // 취소 성공시 true 반환환
  } catch (error) {
    console.error("모임 취소 중 오류:", error);
    throw error;
  }
};
