interface ClockIconProps {
  fill: string;
  className?: string;
}

export const ClockIcon = ({ fill, className }: ClockIconProps) => (
  <svg
    width="17"
    height="15"
    viewBox="0 0 17 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M2.66667 1L1 2.66667"
      stroke={fill}
      strokeWidth="1.66667"
      strokeLinecap="round"
    />
    <path
      d="M14.3333 1L16 2.66667"
      stroke={fill}
      strokeWidth="1.66667"
      strokeLinecap="round"
    />
    <path
      d="M8.5 1C12.1817 1.00018 15.166 3.9852 15.166 7.66699C15.1658 11.3486 12.1816 14.3328 8.5 14.333C4.81821 14.333 1.83318 11.3487 1.83301 7.66699C1.83301 3.98509 4.8181 1 8.5 1ZM10.6875 4.93262C10.3505 4.6631 9.86802 4.69727 9.57227 4.99902L9.51562 5.0625L8.32617 6.54883L6.46191 5.30664L6.38867 5.2627C6.0155 5.06543 5.54594 5.1784 5.30664 5.53711C5.06726 5.89623 5.1435 6.37404 5.46973 6.64258L5.53809 6.69336L7.87891 8.25391L7.96484 8.30566C8.40284 8.54067 8.95409 8.43355 9.27051 8.03809L10.8174 6.10352C11.1048 5.74424 11.0466 5.22017 10.6875 4.93262Z"
      fill={fill}
    />
  </svg>
);
