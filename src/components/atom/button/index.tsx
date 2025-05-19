import clsx from "clsx";

interface ButtonProps {
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Button = ({
  variant = "primary",
  size = "sm",
  onClick,
  disabled = false,
  children,
  className,
}: ButtonProps) => {
  const buttonStyles = clsx(
    "cursor-pointer rounded-xl outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2",
    {
      "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800":
        variant === "primary" && !disabled,
      "border border-primary-600 bg-white text-primary-600 hover:border-primary-700 hover:text-primary-700 active:border-primary-800 active:text-primary-800":
        variant === "outline" && !disabled,
      "disabled:cursor-not-allowed disabled:bg-secondary-400 disabled:text-white":
        variant === "primary" && disabled,
      "disabled:cursor-not-allowed disabled:border disabled:border-secondary-400 disabled:text-secondary-400 disabled:bg-white":
        variant === "outline" && disabled,
    },
    size === "sm" ? "h-10 w-32" : size === "lg" ? "h-11 w-83" : "",
    className,
  );

  return (
    <button className={buttonStyles} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
