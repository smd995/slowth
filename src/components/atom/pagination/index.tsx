import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { EllipsisIcon } from "@/components/icons/EllipsisIcon";
import clsx from "clsx";
interface PaginationProps {
  currentPage: number; //현재 페이지
  totalPages: number; // 전체 페이지 수 : api요청 응답으로 알 수 있음
  onPageChange: (page: number) => void;
  maxVisible?: number; // 기본값 7
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 7,
}: PaginationProps) => {
  // 페이지 번호 리스트로 추출하기
  const getPageNumbers = (): (number | string)[] => {
    // 전체 페이지가 maxVisible 이하면 모든 페이지 표시
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // ... 사이의 중간 영역은 1, ... , ... , total 4개를 제외한 만큼 갯수가 지정됨
    const middleSlots = maxVisible - 4;

    // 앞쪽/뒤쪽 패턴에서 사용할 연속 페이지 수 (...이 앞쪽 또는 뒷쪽 한곳에만 나타날 때)
    const consecutivePages = middleSlots + 2;

    const frontThreshold = consecutivePages;
    const backThreshold = totalPages - consecutivePages + 1;

    if (currentPage <= frontThreshold) {
      // 앞쪽: [1, 2, ..., consecutivePages, ..., total]
      return [
        ...Array.from({ length: consecutivePages }, (_, i) => i + 1),
        "...",
        totalPages,
      ];
    }

    if (currentPage >= backThreshold) {
      // 뒤쪽: [1, ..., total-consecutivePages+1, ..., total]
      const startPage = totalPages - consecutivePages + 1;
      return [
        1,
        "...",
        ...Array.from({ length: consecutivePages }, (_, i) => startPage + i),
      ];
    }

    // 중간: [1, ..., curr-n, ..., curr+n, ..., total]
    const sidePages = Math.floor(middleSlots / 2);
    return [
      1,
      "...",
      ...Array.from(
        { length: middleSlots },
        (_, i) => currentPage - sidePages + i,
      ),
      "...",
      totalPages,
    ];
  };

  const pageNumbers = getPageNumbers();

  const leftArrowFill =
    currentPage === 1
      ? "var(--color-secondary-200)"
      : "var(--color-secondary-800)";

  const rightArrowFill =
    currentPage === totalPages
      ? "var(--color-secondary-200)"
      : "var(--color-secondary-800)";

  const buttonStyles = "flex size-12 items-center justify-center rounded-lg";
  const buttonCursor = "hover:cursor-pointer disabled:cursor-default";
  return (
    <div className="flex w-full items-center justify-center bg-white">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={clsx(buttonStyles, buttonCursor)}
      >
        <ArrowIcon fill={leftArrowFill} direction="left" />
      </button>

      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className={clsx(buttonStyles)}>
            <EllipsisIcon />
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            disabled={page === currentPage}
            className={clsx(buttonStyles, buttonCursor, {
              "text-secondary-800": page === currentPage,
              "text-secondary-200 hover:text-secondary-400":
                page !== currentPage,
            })}
          >
            {page}
          </button>
        ),
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={clsx(buttonStyles, buttonCursor)}
      >
        <ArrowIcon fill={rightArrowFill} direction="right" />
      </button>
    </div>
  );
};
