"use client";

import clsx from "clsx";
import { InputHTMLAttributes, Ref, useRef, useState } from "react";
import { Button } from "../button";

interface FileInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label?: string;
  error?: string;

  className?: string;
  ref?: Ref<HTMLInputElement>;
}

export const FileInput = ({
  label,
  error,
  className,
  ref,
  ...props
}: FileInputProps) => {
  const internalRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const inputRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    } else {
      setSelectedFile(null);
    }

    // 원래 onChange 이벤트도 호출
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const handleAreaClick = () => {
    inputRef.current?.click();
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleAreaClick();
  };

  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      {label && (
        <label htmlFor={props.id || props.name} className="font-semibold">
          {label}
        </label>
      )}

      <div
        className={clsx(
          "rounded-xl text-center",
          error && "border-red-500 hover:border-red-600",
        )}
      >
        {/* 업로드 영역 UI */}
        <div className="flex items-center justify-between gap-2">
          <div className="bg-secondary-50 flex h-10 w-full items-center rounded-lg px-4 py-2 sm:h-11">
            <div
              className={clsx(
                selectedFile ? "text-secondary-700" : "text-secondary-400",
              )}
            >
              {selectedFile ? selectedFile.name : "이미지 선택"}
            </div>
          </div>

          <div className="relative h-10 min-w-32 sm:h-11">
            {/* 실제 input */}
            <input
              ref={ref}
              type="file"
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              {...props}
              onChange={handleFileChange}
            />
            <Button
              type="button"
              variant="outline"
              className="h-full w-full rounded-lg px-4 py-2 transition-colors"
              onClick={handleButtonClick}
            >
              파일 찾기
            </Button>
          </div>
        </div>

        {/* 에러 영역 */}
        <div className="min-h-5">
          {error && (
            <p className="flex items-center gap-1 text-sm text-red-600">
              <span>⚠️</span>
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
