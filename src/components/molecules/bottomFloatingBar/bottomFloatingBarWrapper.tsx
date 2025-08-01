"use client";
import { BottomFloatingBar } from ".";
import { useEffect, useState } from "react";
import { Button, Modal } from "@/shared/ui";
import { useRouter } from "next/navigation";
import { cancelGathering } from "@/effect/gatherings/cancelGathering";
import { joinGathering } from "@/effect/gatherings/joinGathering";
import { leaveGathering } from "@/effect/gatherings/leaveGathering";
import useUserStore from "@/stores/userStore";
import { getJoinedGatherings } from "@/effect/gatherings/getJoinedGatherings";
import axios from "axios";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { Gathering } from "@/entity/gathering";
import { mutate } from "swr"; // 전역 mutate import
interface BottomFloatingBarWrapperrProps {
  gathering: Gathering;
}

export const BottomFloatingBarWrapper = ({
  gathering,
}: BottomFloatingBarWrapperrProps) => {
  const router = useRouter();
  const { user, setUser } = useUserStore();
  const [isJoined, setIsJoined] = useState(false); // 로그인 유저의 참여 여부
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isHost = gathering.createdBy === user?.id;

  const isDeadlinePassed = dayjs().isAfter(dayjs(gathering.registrationEnd));

  // 로그인 유저의 참여 여부 체크
  useEffect(() => {
    if (!user) return;
    const checkJoinedStatus = async () => {
      try {
        const response = await getJoinedGatherings({});
        const joined = response?.some(
          (joinedGathering) => joinedGathering.id === gathering.id,
        );
        setIsJoined(joined);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            console.log("✅error:", error.response?.status);
            setUser(null);
            localStorage.removeItem("token");
            return;
          }
          toast.error(error.response?.data.message);
        } else {
          toast.error("참여 여부 체크에 실패했습니다");
        }
      }
    };

    checkJoinedStatus();
  }, [gathering, user, setUser]);

  const handleJoinClick = async () => {
    // 버튼 포커스 제거
    const activeElement = document.activeElement as HTMLElement | null;
    activeElement?.blur();
    if (!user) {
      setIsModalOpen(true);
      return;
    }
    try {
      const joinResult = await joinGathering(gathering.id);
      if (joinResult.message) {
        toast.success("모임에 참여했습니다");
        setIsJoined(true);
        await mutate(`gathering-info-${gathering.id}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "모임참여에 실패했습니다");
      } else {
        toast.error("모임참여에 실패했습니다");
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
      const cancelResult = await cancelGathering(gathering.id);
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
      const leaveResult = await leaveGathering(gathering.id);
      if (leaveResult) {
        toast.success("모임 참여 취소되었습니다.");
        setIsJoined(false);
        await mutate(`gathering-info-${gathering.id}`);
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
        isFull={gathering.participantCount === gathering.capacity}
        isHost={isHost}
        isJoined={isJoined}
        isDeadlinePassed={isDeadlinePassed}
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
