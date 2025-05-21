import clsx from "clsx";
import Image from "next/image";

interface AvatarProps {
  src?: string;
  className?: string;
}

export const Avatar = ({ src, className }: AvatarProps) => {
  return (
    <div
      className={clsx(
        "bg-secondary-200 flex h-10 w-10 items-center justify-center rounded-full",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt="avatar"
          width={56}
          height={56}
          className="rounded-full"
        />
      ) : (
        <div>A</div>
      )}
    </div>
  );
};
