import React from "react";
import clsx from "clsx";
import { CloseIcon } from "@/components/icons/CloseIcon";

// 프롭스 인터페이스
interface ModalProps {
  isOpen: boolean;                        // 모달 열림 여부
  onClose: () => void;                    // 닫기 핸들러 (배경 클릭 or 닫기 버튼 클릭 시)
  title?: string;                         // 타이틀명
  showHeader?: boolean;                   // 헤더 영역 표시 여부
  showCloseButton?: boolean;              // 헤더 닫기 버튼 표시 여부
  showFooter?: boolean;                   // 푸터 영역 표시 여부
  footer?: React.ReactNode;               // 푸터 버튼 요소
  children: React.ReactNode;              // 콘텐츠 영역 (본문)
  size?: "sm" | "md" | "lg" | "full";     // 모달 너비
  dimmer?: boolean                        // 배경 디머 표시 여부
}

// 모달 컴포넌트 정의
export const Modal = ({
  isOpen,
  onClose,
  title = "",
  showHeader = true,
  showCloseButton = true,
  showFooter = true,
  footer = null,
  children,
  size = "md",
  dimmer = true,
}: ModalProps) => {
  // 열리지 않은 상태면 렌더링하지 않음
  if (!isOpen) return null;

  // 모달 너비 클래스 설정
  const sizeClass = {
    sm: "w-[472px]",
    md: "w-[70%]",
    lg: "w-[90%]",
    full: "w-full",
  }[size];

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center",
        dimmer && "bg-black bg-opacity-50"
      )}
      onClick={onClose} // 배경 클릭 시 모달 닫기
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={clsx(
          "rounded-xl bg-white shadow-lg max-h-[90vh] overflow-y-auto",
          sizeClass
        )}
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 이벤트 버블링 방지
      >
        <div className="p-6 flex flex-col gap-6">
          {/* 헤더 */}
          {showHeader && (
            <div className="flex justify-between items-start">
              {title && (
                <h2 id="modal-title" className="text-lg font-semibold">
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  aria-label="닫기"
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* 콘텐츠 */}
          <div>{children}</div>

          {/* 푸터 */}
          {showFooter && footer && <div>{footer}</div>}
        </div>
      </div>
    </div>
  );
};