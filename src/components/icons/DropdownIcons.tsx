interface DropdownIconProps {
  fill: string;
  className?: string;
}

// Sort
export const SortIcon = ({ fill, className }: DropdownIconProps) => (
  <svg
    data-testid="SortIcon"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="14"
    viewBox="0 0 20 14"
    fill="none"
    className={className}
  >
    <path
      d="M1 6L5 2M5 2L9 6M5 2V12"
      stroke={fill}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M19 8L15 12M15 12L11 8M15 12V2"
      stroke={fill}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);