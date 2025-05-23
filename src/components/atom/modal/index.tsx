import React from "react";
import clsx from "clsx";
import { CloseIcon } from "@/components/icons/CloseIcon";

// 프롭스 인터페이스
interface ModalProps {
  isOpen: boolean; // 모달 열림 여부
  onClose: () => void; // 닫기 핸들러 (배경 클릭 or 닫기 버튼 클릭 시)
  position?: { top: number; left: number }; // 모달 위치 (top, left)
  title?: string; // 타이틀명
  showHeader?: boolean; // 헤더 영역 표시 여부
  showCloseButton?: boolean; // 헤더 닫기 버튼 표시 여부
  showFooter?: boolean; // 푸터 영역 표시 여부
  footer?: React.ReactNode; // 푸터 버튼 요소
  children: React.ReactNode; // 콘텐츠 영역 (본문)
  size?: "sm" | "md" | "lg" | "full" | string; // 모달 너비
  dimmer?: boolean; // 배경 디머 표시 여부
}

// 모달 컴포넌트 정의
export const Modal = ({
  isOpen,
  onClose,
  position,
  title = "",
  showHeader = true,
  showCloseButton = true,
  showFooter = true,
  footer = null,
  children,
  size = "sm",
  dimmer = true,
}: ModalProps) => {
  if (!isOpen) return null;

  // 모달 너비 클래스 설정
  const predefinedSize = {
    sm: "w-[472px]",
    md: "w-[70%]",
    lg: "w-[90%]",
    full: "w-full",
  };
  const sizeClass =
    typeof size === "string" && !(size in predefinedSize)
      ? size
      : predefinedSize[size as keyof typeof predefinedSize] || "w-[70%]";

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50",
        dimmer && "bg-black/50",
        dimmer && "flex items-center justify-center",
      )}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={clsx(
          "absolute max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-lg",
          sizeClass,
        )}
        style={
          !dimmer && position
            ? { top: position.top, left: position.left }
            : undefined
        }
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 이벤트 버블링 방지
      >
        <section className="flex flex-col gap-6 p-6">
          {/* 헤더 */}
          {showHeader && (
            <header className="flex items-start justify-between">
              <div className="flex-1">
                {title && (
                  <h2 id="modal-title" className="text-lg font-semibold">
                    {title}
                  </h2>
                )}
              </div>
              {showCloseButton && (
                <button
                  onClick={onClose}
                  aria-label="닫기"
                  className="cursor-pointer"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              )}
            </header>
          )}

          {/* 콘텐츠 */}
          <section>{children}</section>

          {/* 푸터 */}
          {showFooter && footer && <footer>{footer}</footer>}
        </section>
      </div>
    </div>
  );
};
