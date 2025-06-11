import { GatheringFormData } from "@/components/organisms/gatheringModal";
import client from "@/effect/client/client";

export const createGathering = async (gathering: GatheringFormData) => {
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

    const response = await client.post("/gatherings", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("모임 생성 중 오류:", error);
    throw error;
  }
};
