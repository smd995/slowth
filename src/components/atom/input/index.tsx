import clsx from "clsx";

interface InputProps {
  label?: string;
  type?: "email" | "password" | "text";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  placeholder: string;
  className?: string;
}

export const Input = ({
  label,
  type = "text",
  value,
  onChange,
  errorMessage,
  placeholder,
}: InputProps) => {
  return (
    <div className={clsx("flex flex-col gap-2")}>
      <label htmlFor={label} className="font-semibold">
        {label}
      </label>
      <input
        type={type}
        value={value}
        name={label}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx(
          "bg-secondary-50 h-11 rounded-xl px-4 py-2.5 outline-none",
          errorMessage ? "border-2 border-red-600" : "",
        )}
      />
      <p className="min-h-5 text-sm text-red-600">{errorMessage}</p>
    </div>
  );
};
