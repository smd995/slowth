// 모임 참여하기
export const joinGathering = async (id: number) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/gatherings/${id}/join`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "모임 참여하기에 실패했습니다.");
    }

    return true; // 참여 성공시 true 반환
  } catch (error) {
    console.error("모임 참여 중 오류:", error);
    throw error;
  }
};
