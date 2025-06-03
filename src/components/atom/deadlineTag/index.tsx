import { ClockIcon } from "@/components/icons/ClockIcon";
import { getDeadlineMessage } from "@/effect/date/getDeadlineMessage";
import clsx from "clsx";

interface Props {
  className?: string;
  registrationEnd: string;
}

export const DeadlineTag = ({ className, registrationEnd }: Props) => {
  const { isDeadlineSoon, message } = getDeadlineMessage(registrationEnd);
  return (
    <div
      className={clsx(
        !isDeadlineSoon && "hidden",
        "bg-primary-500 absolute top-0 right-0 flex w-fit items-center rounded-bl-xl py-1 pr-2.5 pl-2",
        className,
      )}
    >
      <div className="mr-0.5 flex size-6 items-center justify-center">
        <ClockIcon fill="#ffffff" />
      </div>
      <p className="text-white">{message}</p>
    </div>
  );
};
