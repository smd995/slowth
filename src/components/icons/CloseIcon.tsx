interface CloseIconProps {
  fill?: string;
  className?: string;
}

export const CloseIcon = ({
  fill = "#64748B",
  className,
}: CloseIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="15"
    viewBox="0 0 16 15"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M1.5 1L14.5 14"
      stroke={fill}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M14.5 1L1.5 14"
      stroke={fill}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);