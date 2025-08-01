"use client";

import { useState } from "react";
import { Modal, Button } from "@/shared/ui";
import { HeartIcon } from "@/components/icons/HeartIcons";
import clsx from "clsx";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  gatheringId: number;
  onSubmit: (reviewData: {
    gatheringId: number;
    score: number;
    comment: string;
  }) => void;
}

export const ReviewModal = ({
  isOpen,
  onClose,
  gatheringId,
  onSubmit,
}: ReviewModalProps) => {
  const [score, setScore] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredScore, setHoveredScore] = useState(0);

  const handleSubmit = () => {
    if (score > 0 && comment.trim()) {
      onSubmit({ gatheringId, score, comment: comment.trim() });
      // 모달 초기화
      setScore(0);
      setComment("");
      onClose();
    }
  };

  const handleClose = () => {
    // 모달 초기화
    setScore(0);
    setComment("");
    onClose();
  };

  const isValid = score > 0 && comment.trim().length > 0;

  const footer = (
    <div className="flex w-full gap-3">
      <Button
        variant="outline"
        size="lg"
        onClick={handleClose}
        className="flex-1"
      >
        취소
      </Button>
      <Button
        variant="primary"
        size="lg"
        onClick={handleSubmit}
        disabled={!isValid}
        className="flex-1"
      >
        리뷰 작성
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="리뷰 작성하기"
      footer={footer}
      size="sm"
    >
      <div className="space-y-6">
        {/* 평점 선택 */}
        <div className="space-y-3">
          <label className="text-secondary-800 block text-base font-semibold">
            만족스러운 경험이었나요?
          </label>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, index) => {
              const starIndex = index + 1;
              const isActive = starIndex <= (hoveredScore || score);

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setScore(starIndex)}
                  onMouseEnter={() => setHoveredScore(starIndex)}
                  onMouseLeave={() => setHoveredScore(0)}
                  className={clsx(
                    "focus:ring-primary-500 rounded transition-transform hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:outline-none",
                    "p-1",
                  )}
                >
                  <HeartIcon
                    fill={
                      isActive
                        ? "var(--color-heart-secondary)"
                        : "var(--color-secondary-200)"
                    }
                    className="h-8 w-8"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* 리뷰 내용 */}
        <div className="space-y-3">
          <label
            htmlFor="comment"
            className="text-secondary-800 block text-base font-semibold"
          >
            경험에 대해 남겨주세요.
          </label>
          <textarea
            id="comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다."
            className={clsx(
              "bg-secondary-50 w-full rounded-lg px-3 py-2",
              "focus:ring-primary-500 focus:ring-2 focus:outline-none",
              "resize-none",
            )}
            maxLength={500}
          />
        </div>
      </div>
    </Modal>
  );
};
