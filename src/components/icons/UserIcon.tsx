import React from "react";

interface IconProps {
  className?: string;
}

export const UserIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={className}
  >
    <circle cx="8.00065" cy="5.33342" r="2.66667" fill="currentColor" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.99978 8.66675C5.55331 8.66675 3.54653 10.2804 3.34906 12.3337C3.33143 12.5169 3.48235 12.6667 3.66644 12.6667H12.3331C12.5172 12.6667 12.6681 12.5169 12.6505 12.3337C12.453 10.2804 10.4462 8.66675 7.99978 8.66675Z"
      fill="currentColor"
    />
  </svg>
);
