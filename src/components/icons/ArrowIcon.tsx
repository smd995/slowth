import clsx from "clsx";

interface ArrowIconProps {
  direction?: "up" | "down" | "left" | "right";  // 기본값은 down
  fill: string;
  className?: string;
}

export const ArrowIcon = ({
  direction = "down",
  fill,
  className,
}: ArrowIconProps) => {
  const rotation = {
    up: "rotate-180",
    right: "-rotate-90",
    down: "rotate-0",
    left: "rotate-90",
  }[direction];

  return (
    <svg
      className={clsx("transform", rotation, className)}
      xmlns="http://www.w3.org/2000/svg"
      width="24" height="24" viewBox="0 0 24 24" fill="none"
    >
      <path
        d="M12.7151 15.4653C12.3975 15.7654 11.9008 15.7654 11.5832 15.4653L5.8047 10.006C5.26275 9.49404 5.6251 8.58286 6.37066 8.58286H17.9276C18.6732 8.58286 19.0355 9.49404 18.4936 10.006L12.7151 15.4653Z"
        fill={fill}
      />
    </svg>
  );
};