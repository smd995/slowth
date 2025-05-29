import clsx from "clsx";
import { InputHTMLAttributes, Ref } from "react";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label?: string;
  error?: string;
  className?: string;
  ref?: Ref<HTMLInputElement>;
}

export function Input({ label, error, className, ref, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={props.id || props.name} className="font-semibold">
          {label}
        </label>
      )}

      <input
        ref={ref}
        className={clsx(
          "bg-secondary-50 h-11 rounded-xl px-4 py-2.5 transition-colors outline-none",
          error
            ? "focus:ring-opacity-50 border-2 border-red-500 focus:ring-2 focus:ring-red-500"
            : "focus:ring-opacity-50 border border-gray-200 focus:ring-2 focus:ring-blue-500",
          className,
        )}
        {...props}
      />

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
}
