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
    "cursor-pointer rounded-xl outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2",
    {
      "bg-orange-600 text-white hover:bg-orange-700 active:bg-orange-800":
        variant === "primary" && !disabled,
      "border border-orange-600 bg-white text-orange-600 hover:border-orange-700 hover:text-orange-700 active:border-orange-800 active:text-orange-800":
        variant === "outline" && !disabled,
      "disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-white":
        variant === "primary" && disabled,
      "disabled:cursor-not-allowed disabled:border disabled:border-gray-400 disabled:text-gray-400 disabled:bg-white":
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
