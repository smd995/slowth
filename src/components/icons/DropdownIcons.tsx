interface DropdownIconProps {
  fill: string;
  className?: string;
}

// ChevronDown
export const ChevronDownIcon = ({ fill, className }: DropdownIconProps) => (
  <svg
    data-testid="ChevronDownIcon"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M12.7151 15.4653C12.3975 15.7654 11.9008 15.7654 11.5832 15.4653L5.8047 10.006C5.26275 9.49404 5.6251 8.58286 6.37066 8.58286H17.9276C18.6732 8.58286 19.0355 9.49404 18.4936 10.006L12.7151 15.4653Z"
      fill={fill}
    />
  </svg>
);

// ChevronUp (ChevronDown을 회전)
export const ChevronUpIcon = ({ fill, className }: DropdownIconProps) => (
  <svg
    data-testid="ChevronUpIcon"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M12.7151 15.4653C12.3975 15.7654 11.9008 15.7654 11.5832 15.4653L5.8047 10.006C5.26275 9.49404 5.6251 8.58286 6.37066 8.58286H17.9276C18.6732 8.58286 19.0355 9.49404 18.4936 10.006L12.7151 15.4653Z"
      fill={fill}
      transform="rotate(180 12 12)"
    />
  </svg>
);

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