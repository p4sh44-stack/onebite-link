import type { Metadata } from "next";
import "./globals.css";
import { FolderProvider } from "@/context/FolderContext";

export const metadata: Metadata = {
  title: "한입 링크",
  description: "나만의 링크 북마크 앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
          <FolderProvider>{children}</FolderProvider>
        </body>
    </html>
  );
}
