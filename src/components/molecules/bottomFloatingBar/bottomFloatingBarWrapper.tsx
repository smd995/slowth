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
import { getJoinedGatherings } from "@/effect/gatherings/getJoinedGatherings";
import axios from "axios";
import { toast } from "react-toastify";
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

  const isHost = hostId === user?.id;

  // 로그인 유저의 참여 여부 체크
  useEffect(() => {
    const checkJoinedStatus = async () => {
      try {
        const response = await getJoinedGatherings({});
        const joined = response?.some(
          (gathering) => gathering.id === gatheringId,
        );
        setIsJoined(joined);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.message);
        } else {
          toast.error("참여 여부 체크에 실패했습니다");
        }
      }
    };

    checkJoinedStatus();
  }, [gatheringId]);

  const handleJoinClick = async () => {
    // 버튼 포커스 제거
    const activeElement = document.activeElement as HTMLElement | null;
    activeElement?.blur();

    try {
      const joinResult = await joinGathering(gatheringId);
      if (joinResult.message) {
        toast.success("모임에 참여했습니다");
        setIsJoined(true);
        router.refresh();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data.message || "모임참여여에 실패했습니다",
        );
      } else {
        toast.error("모임참여여에 실패했습니다");
      }
    }
  };

  const handleShareClick = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      toast.success("링크가 복사되었습니다!");
    } catch (err) {
      console.error("링크 복사 실패:", err);
      toast.error("링크 복사에 실패했습니다.");
    }
  };

  const handleCancelClick = async () => {
    try {
      const cancelResult = await cancelGathering(gatheringId);
      if (cancelResult.canceldAt !== null) {
        toast.success("모임이 취소되었습니다.");
        router.replace("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "모임취소에 실패했습니다");
      } else {
        toast.error("모임취소에 실패했습니다");
      }
    }
  };

  const handleLeaveClick = async () => {
    // 버튼 포커스 제거
    const activeElement = document.activeElement as HTMLElement | null;
    activeElement?.blur();

    try {
      const leaveResult = await leaveGathering(gatheringId);
      if (leaveResult) {
        toast.success("모임 참여 취소되었습니다.");
        setIsJoined(false);
        router.refresh();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data.message || "모임 참여 취소에 실패했습니다",
        );
      } else {
        toast.error("모임 참여 취소에 실패했습니다");
      }
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
