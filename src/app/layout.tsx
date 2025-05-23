import "./globals.css";
import { initMocks } from "../../__tests__/mocks";
import localFont from "next/font/local";
import { MSWComponent } from "@/components/providers/msw-component";

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
        <MSWComponent>{children}</MSWComponent>
      </body>
    </html>
  );
}
