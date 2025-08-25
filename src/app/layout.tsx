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

export const metadata = {
  title: 'Slo',
  description: '간단히 모임을 만들 수 있는 웹사이트',
  // 바로 이 부분에 추가합니다.
  verification: {
    google: '_p9yr043ajFuMjOfbekGJBUz3tdvgeep2BKOyoBLAIE',
  },
};

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

        <ToastContainer autoClose={2000} />
      </body>
    </html>
  );
}
