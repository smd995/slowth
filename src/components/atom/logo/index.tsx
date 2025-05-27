import React from "react";
import { LogoIcon } from "@/components/icons/LogoIcon";

interface LogoProps {
  fill?: string;
  height?: number | string;
  className?: string;
}

export const Logo = ({
  fill = "#FFFFFF",
  height = 22,
  className,
}: LogoProps) => {
  return <LogoIcon fill={fill} height={height} className={className} />;
};
