import clsx from "clsx";
import { InputHTMLAttributes, Ref } from "react";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label?: string;
  error?: string;
  className?: string;
  ref?: Ref<HTMLInputElement>;
}

export const Input = ({
  label,
  error,
  className,
  ref,
  ...props
}: InputProps) => {
  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      {label && (
        <label htmlFor={props.id || props.name} className="font-semibold">
          {label}
        </label>
      )}

      <input
        ref={ref}
        className={clsx(
          "bg-secondary-50 h-10 rounded-xl px-4 py-2.5 transition-colors outline-none sm:h-11",
          error
            ? "focus:ring-opacity-50 border-2 border-red-500 focus:ring-2 focus:ring-red-500"
            : "focus:ring-opacity-50 border-secondary-500 focus:ring-primary-500 border focus:ring-2",
          className,
        )}
        {...props}
      />

      {/* 에러 영역 - 항상 공간 확보 */}
      <div className="min-h-6">
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
