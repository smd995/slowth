import clsx from "clsx";
import { Calendar, Check, Clock, CheckCircle } from "lucide-react";

interface Props {
  className?: string;
  status: "scheduled" | "completed" | "pending" | "confirmed";
}

export const StatusChip = ({ className, status }: Props) => {
  const statusConfig = {
    scheduled: {
      text: "이용 예정",
      className: "bg-primary-100 text-primary-600",
      icon: Calendar,
    },
    completed: {
      text: "이용 완료",
      className: "bg-secondary-100 text-secondary-500",
      icon: Check,
    },
    pending: {
      text: "개설 대기",
      className:
        "bg-transparent text-secondary-500 border border-secondary-200",
      icon: Clock,
    },
    confirmed: {
      text: "개설 확정",
      className: "bg-transparent text-primary-500 border border-primary-100",
      icon: CheckCircle,
    },
  };

  const config = statusConfig[status];
  const IconComponent = config.icon;

  return (
    <div className={clsx(className)}>
      <div className="flex items-center">
        <p
          className={clsx(
            "flex items-center gap-1.5 rounded-3xl px-3 py-1.5 text-sm font-medium",
            config.className,
          )}
        >
          <IconComponent size={14} />
          {config.text}
        </p>
      </div>
    </div>
  );
};
