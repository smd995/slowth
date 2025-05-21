import { Button } from "@/components/atom/button";
import clsx from "clsx";

interface BottomFloatingBarProps {
  isHost?: boolean; // 주최자 여부 (기본값 false)
  onJoinClick: () => void; // 참여하기 버튼 클릭 핸들러
  onCancelClick: () => void; // (주최자) 모임 취소하기 버튼 클릭 핸들러
  onShareClick: () => void; //(주최자) 모임 공유하기 버튼 클릭 핸들러
}

export const BottomFloatingBar = ({
  isHost = false,
  onJoinClick,
  onCancelClick,
  onShareClick,
}: BottomFloatingBarProps) => {
  return (
    <div className="border-t-secondary-900 fixed bottom-0 flex w-full items-center justify-center border-t-2 bg-white">
      <div
        className={clsx(
          "flex w-full max-w-5xl items-center justify-between px-4 py-5 sm:px-6",
          isHost ? "flex-col sm:flex-row" : "flex-row",
        )}
      >
        <div className="w-full">
          <p className="text-secondary-900 text-sm font-semibold">
            더 건강한 나와 팀을 위한 프로그램 🏃
          </p>
          <p className="text-secondary-700 text-xs font-medium">
            {isHost ? (
              <>모임을 공유해서 더 많은 사람들이 참여할 수 있도록 독려해봐요</>
            ) : (
              <>
                국내 최고 웰니스 전문가와 프로그램을 통해 지친 몸과 마음을
                회복해봐요
              </>
            )}
          </p>
        </div>
        {isHost ? (
          <div className="mt-2 flex w-full gap-x-2 sm:mt-0 sm:w-fit">
            <Button
              variant="outline"
              className="w-full sm:w-32"
              onClick={onCancelClick}
            >
              취소하기
            </Button>
            <Button className="w-full sm:w-32" onClick={onShareClick}>
              공유하기
            </Button>
          </div>
        ) : (
          <Button size="sm" onClick={onJoinClick} className="ml-2">
            참여하기
          </Button>
        )}
      </div>
    </div>
  );
};
