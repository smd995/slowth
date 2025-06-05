import clsx from "clsx";
import { Ref, SelectHTMLAttributes } from "react";

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "className"> {
  label?: string;
  error?: string;
  className?: string;
  ref?: Ref<HTMLSelectElement>;
  children: React.ReactNode;
}
export const Select = ({
  label,
  error,
  className,
  ref,
  children,
  ...props
}: SelectProps) => {
  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      {label && (
        <label htmlFor={props.id || props.name} className="font-semibold">
          {label}
        </label>
      )}

      <select
        ref={ref}
        className={clsx(
          "bg-secondary-50 h-11 rounded-xl px-4 py-2.5 transition-colors outline-none",
          error
            ? "focus:ring-opacity-50 border-2 border-red-500 focus:ring-2 focus:ring-red-500"
            : "focus:ring-opacity-50 border-secondary-500 focus:ring-primary-500 border focus:ring-2",
        )}
        {...props}
      >
        {children}
      </select>

      {/* 에러 영역 - 항상 공간 확보 */}
      <div className="min-h-5">
        {error && (
          <p className="flex items-center gap-1 text-sm text-red-600">
            <span>⚠️</span>
            {error}
          </p>
        )}
      </div>
    </div>
  );
};
