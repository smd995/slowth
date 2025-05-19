import clsx from "clsx";

interface InputProps {
  label?: string;
  type?: "email" | "password" | "text";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
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
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        value={value}
        name={label}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx(
          "h-11 rounded-xl border-2 border-gray-400 bg-gray-50 px-4 py-2.5 outline-none",
          errorMessage ? "border-red-600" : "",
        )}
      />
      <p className="min-h-5 text-sm text-red-600">{errorMessage}</p>
    </div>
  );
};
