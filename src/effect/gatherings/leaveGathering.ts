// 모임 참여 취소하기
export const leaveGathering = async (id: number) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/gatherings/${id}/leave`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "모임 참여 취소하기에 실패했습니다.",
      );
    }

    return true; // 참여하기 취소 성공시 true 반환
  } catch (error) {
    console.error("모임 참여 취소 중 오류:", error);
    throw error;
  }
};
