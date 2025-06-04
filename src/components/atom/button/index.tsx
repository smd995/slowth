import clsx from "clsx";
import { ButtonHTMLAttributes, Ref } from "react";

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  disabled: boolean;
  ref?: Ref<HTMLButtonElement>;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  disabled,
  ref,
  ...props
}: ButtonProps) {
  const buttonStyles = clsx(
    // 기본 스타일
    "inline-flex items-center justify-center rounded-xl font-medium transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",

    // 크기별 스타일
    {
      "h-8 px-3 text-sm": size === "sm",
      "h-10 px-4 text-sm": size === "md",
      "h-11 px-6 text-base": size === "lg",
    },

    // variant별 스타일
    {
      // Primary variant
      "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800":
        variant === "primary" && !disabled,
      "disabled:bg-gray-300 disabled:text-gray-500":
        variant === "primary" && disabled,

      // Outline variant
      "border-2 border-primary-600 bg-transparent text-primary-600 hover:bg-primary-50 active:bg-primary-100":
        variant === "outline" && !disabled,
      "disabled:border-gray-300 disabled:text-gray-400 disabled:bg-transparent":
        variant === "outline" && disabled,
    },

    className,
  );

  return (
    <button ref={ref} className={buttonStyles} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
