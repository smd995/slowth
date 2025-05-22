import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { test, describe, expect, vi } from "vitest";
import { GatheringInformation } from ".";
import { Gathering } from "@/entity/gathering";
import { useEffect, useState } from "react";
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

test("비동기 API 응답 후 GatheringInformation 컴포넌트가 렌더링 된다", async () => {
  // 가상의 fetch 함수가 있다고 가정하고 모킹
  const fetchGathering = vi.fn().mockResolvedValue(mockGathering);

  const AsyncWrapper = () => {
    const [gathering, setGathering] = useState<Gathering | null>(null);

    useEffect(() => {
      fetchGathering().then(setGathering);
    }, []);

    if (!gathering) return <div>Loading...</div>;

    return <GatheringInformation gatheringInfo={gathering} />;
  };

  render(<AsyncWrapper />);

  // "달램핏 오피스 스트레칭" 텍스트가 뜨는지 확인 (비동기 렌더링 기다리기)
  await waitFor(() => {
    expect(screen.getByText("달램핏 오피스 스트레칭")).toBeInTheDocument();
    expect(screen.getByText(/을지로 3가/)).toBeInTheDocument();
  });
});
