"use client";
import { Modal } from "@/components/atom/modal";
import { BottomFloatingBar } from ".";
import { useEffect, useState } from "react";
import { Button } from "@/components/atom/button";
import { useRouter } from "next/navigation";
import { cancelGathering } from "@/effect/gatherings/cancelGathering";
import { joinGathering } from "@/effect/gatherings/joinGathering";
import { leaveGathering } from "@/effect/gatherings/leaveGathering";
import useUserStore from "@/stores/userStore";
import { checkIsJoined } from "@/effect/gatherings/checkIsJoined";
interface BottomFloatingBarWrapperrProps {
  isFull: boolean;
  gatheringId: number;
  hostId: number;
}

export const BottomFloatingBarWrapper = ({
  isFull,
  gatheringId,
  hostId,
}: BottomFloatingBarWrapperrProps) => {
  const router = useRouter();
  const { user } = useUserStore();
  const [isJoined, setIsJoined] = useState(false); // 로그인 유저의 참여 여부
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 로그인 유저가 주최자인가
  const isHost = hostId === user?.id;

  // 로그인 유저의 참여 여부 체크
  useEffect(() => {
    const checkJoinedStatus = async () => {
      const result = await checkIsJoined(gatheringId);
      setIsJoined(result);
    };

    checkJoinedStatus();
  }, [gatheringId]);

  const handleJoinClick = async () => {
    // 버튼 포커스 제거
    const activeElement = document.activeElement as HTMLElement | null;
    activeElement?.blur();

    const joinResult = await joinGathering(gatheringId);
    // 모임 참여 성공시, 새로고침
    if (joinResult) {
      alert("모임에 참여했습니다");
      router.refresh();
    }
  };

  const handleShareClick = async () => {
    try {
      const url = window.location.href; // 현재 페이지의 URL
      await navigator.clipboard.writeText(url);
      // console.log(`${gatheringId}번 모임 링크 복사됨:`, url);
      alert("링크가 복사되었습니다!");
    } catch (err) {
      console.error("링크 복사 실패:", err);
      alert("링크 복사에 실패했습니다.");
    }
  };

  const handleCancelClick = async () => {
    const cancelResult = await cancelGathering(gatheringId);
    // 모임 취소 성공시, 메인페이지 이동
    if (cancelResult) {
      alert("모임이 취소되었습니다.");
      router.replace("/");
    }
  };

  const handleLeaveClick = async () => {
    // 버튼 포커스 제거
    const activeElement = document.activeElement as HTMLElement | null;
    activeElement?.blur();

    const leaveResult = await leaveGathering(gatheringId);
    if (leaveResult) {
      alert("모임 참여 취소되었습니다.");
      router.refresh();
    }
  };

  return (
    <>
      <BottomFloatingBar
        isFull={isFull}
        isHost={isHost}
        isJoined={isJoined}
        onCancelClick={handleCancelClick}
        onLeaveClick={handleLeaveClick}
        onJoinClick={handleJoinClick}
        onShareClick={handleShareClick}
      />
      <Modal
        size="sm"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="flex w-full flex-col items-center justify-center">
          <p className="text-secondary-900 mb-10 text-base">
            로그인이 필요합니다.
          </p>
          <Button
            size="lg"
            className="w-28"
            onClick={() => router.push("/login")}
          >
            확인
          </Button>
        </div>
      </Modal>
    </>
  );
};
