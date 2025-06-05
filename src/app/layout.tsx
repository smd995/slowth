import "./globals.css";
import localFont from "next/font/local";
import { GNB } from "@/components/molecules/gnb";

import { ToastContainer } from "react-toastify";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body className={`${pretendard.className}`}>
        {/* 공통 GNB */}
        <GNB />
        {/* 메인 콘텐츠 */}
        {children}

        <ToastContainer />


      </body>
    </html>
  );
}
