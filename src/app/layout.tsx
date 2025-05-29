import "./globals.css";
import { initMocks } from "../../__tests__/mocks";
import localFont from "next/font/local";
import { GNB } from "@/components/molecules/gnb";
import { MSWComponent } from "@/components/providers/mswComponent";

initMocks();

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
        <GNB favoriteCount={12} username="홍길동" />
        {/* 메인 콘텐츠 */}
        <MSWComponent>{children}</MSWComponent>
      </body>
    </html>
  );
}
