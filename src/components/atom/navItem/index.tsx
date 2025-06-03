import React from "react";
import clsx from "clsx";

interface NavItemProps {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  active?: boolean;
}

export const NavItem = ({
  children,
  className,
  ariaLabel,
  active = false,
}: NavItemProps) => {
  return (
    <div
      role="link"
      aria-label={ariaLabel}
      className={clsx(
        "group flex h-[60px] cursor-pointer items-center gap-1.5 text-sm font-semibold transition",
        active ? "text-secondary-900" : "hover:text-secondary-900 text-white",
        className,
      )}
    >
      {children}
    </div>
  );
};
