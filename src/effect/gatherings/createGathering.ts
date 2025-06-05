import { GatheringFormData } from "@/components/organisms/gatheringModal";

export const createGathering = async (gathering: GatheringFormData) => {
  const token = localStorage.getItem("token");

  try {
    const formData = new FormData();

    // 각 필드를 FormData에 추가
    formData.append("name", gathering.name);
    formData.append("location", gathering.location);
    formData.append("dateTime", gathering.dateTime);
    formData.append("registrationEnd", gathering.registrationEnd);
    formData.append("type", gathering.type);
    formData.append("capacity", gathering.capacity?.toString() || "");

    // 파일이 있는 경우에만 추가 (FileList에서 첫 번째 파일 가져오기)
    if (gathering.image && gathering.image.length > 0) {
      formData.append("image", gathering.image[0]);
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/gatherings`,
      {
        method: "POST",
        headers: {
          // Content-Type을 명시하지 않음 (브라우저가 자동으로 boundary 설정)
          Authorization: `Bearer ${token}`,
        },
        body: formData, // FormData 객체 사용
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "모임 생성에 실패했습니다.");
    }

    return response.json();
  } catch (error) {
    console.error("모임 생성 중 오류:", error);
    throw error;
  }
};
