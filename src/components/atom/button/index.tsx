import clsx from "clsx";

interface ButtonProps {
  className?: string;
}

export const Button = ({ className }: ButtonProps) => {
  return <div className={clsx(className)}></div>;
};
