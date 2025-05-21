import clsx from "clsx";

interface InfoChipProps {
  type?: "date" | "time"; // 타입 : 날짜, 시간 (타입에 따라 텍스트 색상이 달라집니다)
  children: React.ReactNode;
  className?: string;
}

export const InfoChip = ({
  type = "date",
  children,
  className,
}: InfoChipProps) => {
  return (
    <div
      className={clsx(
        "bg-secondary-900 w-fit rounded-sm px-2 py-0.5 text-sm",
        type === "date" ? "text-white" : "text-primary-600",
        className,
      )}
    >
      {children}
    </div>
  );
};
