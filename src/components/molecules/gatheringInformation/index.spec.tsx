import { render, screen, waitFor } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import { GatheringInformation } from ".";
import { Gathering } from "@/entity/gathering";
import { useEffect, useState } from "react";
import { participantAvatar } from "./avatarList";
import { getParticipants } from "@/effect/gatherings/getGatheringDetail";
// 예시 mock 데이터
const mockGathering: Gathering = {
  teamId: 5,
  id: 123,
  type: "string",
  name: "달램핏 오피스 스트레칭",
  dateTime: "2025-05-21T09:06:50.733Z",
  registrationEnd: "2025-05-21T09:06:50.733Z",
  location: "을지로 3가 서울시 중구 청계천로 100",
  participantCount: 16,
  capacity: 20,
  image: "string",
  createdBy: 0,
  canceledAt: "2025-05-21T09:06:50.733Z",
};

// 예시 참가자 아바타 데이터
const mockAvatars = [
  { id: 0, name: "Eunbin", image: "/vercel.svg" },
  { id: 1, name: "Hyejin", image: "/window.svg" },
  { id: 2, name: "Changgi", image: "/globe.svg" },
  { id: 3, name: "Jocelyn", image: "/file.svg" },
  { id: 4, name: "Jocelyn", image: "/vercel.svg" },
];

//getParticipants mock 처리
vi.mock("@/api", () => ({
  getParticipants: vi.fn().mockResolvedValue(mockAvatars),
}));

test("비동기 API 응답 후 GatheringInformation 컴포넌트가 렌더링 된다", async () => {
  // 가상의 fetch 함수가 있다고 가정하고 모킹
  const fetchGathering = vi.fn().mockResolvedValue(mockGathering);

  const AsyncWrapper = () => {
    const [gathering, setGathering] = useState<Gathering | null>(null);
    const [participantAvatars, setParticipantAvatars] = useState<
      participantAvatar[]
    >([]);

    useEffect(() => {
      const fetchData = async () => {
        const gatheringData = await fetchGathering();
        setGathering(gatheringData);

        const avatars = await getParticipants("123");
        setParticipantAvatars(avatars);
      };

      fetchData();
    }, []);

    if (!gathering) return <div>Loading...</div>;

    return (
      <GatheringInformation
        gatheringInfo={gathering}
        participantAvatars={participantAvatars}
      />
    );
  };

  render(<AsyncWrapper />);

  // "달램핏 오피스 스트레칭" 텍스트가 뜨는지 확인 (비동기 렌더링 기다리기)
  await waitFor(() => {
    expect(screen.getByText("달램핏 오피스 스트레칭")).toBeInTheDocument();
    expect(screen.getByText(/을지로 3가/)).toBeInTheDocument();
  });
});
