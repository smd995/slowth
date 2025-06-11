import { ClockIcon } from "@/components/icons/ClockIcon";
import { getDeadlineMessage } from "@/libs/date/getDeadlineMessage";
import clsx from "clsx";

interface DeadlineTagProps {
  className?: string;
  registrationEnd: string;
}

export const DeadlineTag = ({
  className,
  registrationEnd,
}: DeadlineTagProps) => {
  const { deadlinePassed, isDeadlineSoon, message } =
    getDeadlineMessage(registrationEnd);

  const baseClasses =
    "absolute top-2 right-2 flex h-8 w-fit items-center rounded-xl px-3 py-1";

  if (deadlinePassed) {
    return (
      <div className={`bg-secondary-500 ${baseClasses}`}>
        <p className="text-white">{message}</p>
      </div>
    );
  }

  if (!isDeadlineSoon) return null;

  return (
    <div className={clsx(`bg-primary-500 ${baseClasses}`, className)}>
      <div className="mr-0.5 -ml-0.5 flex size-6 items-center justify-center">
        <ClockIcon fill="#ffffff" />
      </div>
      <p className="text-white">{message}</p>
    </div>
  );
};
