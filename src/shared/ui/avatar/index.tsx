import clsx from "clsx";
import Image from "next/image";

interface AvatarProps {
  src?: string;
  username: string;
  className?: string;
}

export const Avatar = ({ src, username, className }: AvatarProps) => {
  return (
    <div
      className={clsx(
        "relative flex h-14 w-14 items-center justify-center rounded-full",
        className,
      )}
    >
      <Image
        src={src || "/image/alt-profile.png"}
        alt={`${username}님의 프로필`}
        fill
        sizes="56px"
        className="rounded-full object-cover"
      />
    </div>
  );
};
