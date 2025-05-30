import React from "react";

interface IconProps {
  className?: string;
}

export const VacationIcon = ({ className }: IconProps) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M26 28C26 25.2386 21.299 22.5 15.5 22.5C9.70101 22.5 5 25.2386 5 28H26Z"
      fill="currentColor"
    />
    <rect
      x="11.0586"
      y="14.8926"
      width="1"
      height="9.52579"
      rx="0.5"
      transform="rotate(-16.685 11.0586 14.8926)"
      fill="currentColor"
    />
    <rect
      x="9"
      y="9.28711"
      width="1"
      height="1.49575"
      rx="0.5"
      transform="rotate(-16.685 9 9.28711)"
      fill="currentColor"
    />
    <path
      d="M9.99993 10C5.71814 11.1418 4.57682 15.4072 4.57715 18.7256C4.57727 19.928 5.94396 20.1119 6.48172 19.0364C6.77906 18.4417 7.46842 18.1562 8.09916 18.3664L8.6629 18.5543C9.46624 18.8221 10.3513 18.5607 10.8803 17.8995L11.0813 17.6483C11.6332 16.9584 12.5568 16.6856 13.395 16.965L13.7161 17.0721C14.4662 17.3221 15.2894 17.0176 15.6962 16.3396L15.8126 16.1455C16.2005 15.4991 17.0205 15.2603 17.6947 15.5974C18.797 16.1486 19.8545 15.2013 19.1791 14.1705C17.4694 11.5608 14.288 8.85654 9.99993 10Z"
      fill="currentColor"
    />
    <circle cx="24.5" cy="8" r="3.5" fill="currentColor" />
    <path d="M19.75 8L18.75 8" stroke="currentColor" strokeLinecap="round" />
    <path d="M30 8L29 8" stroke="currentColor" strokeLinecap="round" />
    <path
      d="M21.1046 11.2704L20.3975 11.9775"
      stroke="currentColor"
      strokeLinecap="round"
    />
    <path
      d="M28.3526 4.02239L27.6455 4.72949"
      stroke="currentColor"
      strokeLinecap="round"
    />
    <path
      d="M21.1046 4.72957L20.3975 4.02246"
      stroke="currentColor"
      strokeLinecap="round"
    />
    <path
      d="M28.3526 11.9776L27.6455 11.2705"
      stroke="currentColor"
      strokeLinecap="round"
    />
    <path
      d="M24.375 12.625L24.375 13.625"
      stroke="currentColor"
      strokeLinecap="round"
    />
    <path
      d="M24.375 2.375L24.375 3.375"
      stroke="currentColor"
      strokeLinecap="round"
    />
  </svg>
);
