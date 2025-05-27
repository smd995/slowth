interface OpenConfirmedBadgeProps {
  participantCount: number;
}

export const OpenConfirmedBadge = ({
  participantCount,
}: OpenConfirmedBadgeProps) => {
  return participantCount >= 5 ? (
    <div>
      <div className="flex h-6 w-fit items-center justify-center">
        <div className="bg-primary-500 flex size-4.5 items-center justify-center rounded-full">
          <svg
            width="10"
            height="7"
            viewBox="0 0 10 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 2.82453L4.00872 5.33325L8.34198 1"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-primary-500 pl-1.5">개설확정</span>
      </div>
    </div>
  ) : (
    <></>
  );
};
