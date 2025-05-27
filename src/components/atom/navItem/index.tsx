import React from "react";
import clsx from "clsx";

interface NavItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
  active?: boolean;
}

export const NavItem = ({
  children,
  className,
  onClick,
  ariaLabel,
  active = false,
}: NavItemProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={clsx(
        "group flex h-[60px] cursor-pointer items-center gap-1.5 text-sm font-semibold transition",
        active ? "text-secondary-900" : "hover:text-secondary-900 text-white",
        className,
      )}
    >
      {children}
    </button>
  );
};
