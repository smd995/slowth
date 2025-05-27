"use client";
import { BottomFloatingBar } from ".";

interface BottomFloatingBarWrapperrProps {
  gatheringId: number;
}

export const BottomFloatingBarWrapper = ({
  gatheringId,
}: BottomFloatingBarWrapperrProps) => {
  return (
    <BottomFloatingBar
      onCancelClick={() => console.log(`${gatheringId}번 모임 취소`)}
      onJoinClick={() => console.log(`${gatheringId}번 모임 참가`)}
      onShareClick={() => console.log(`${gatheringId}번 모임 `)}
    />
  );
};
