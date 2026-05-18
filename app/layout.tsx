import type { Metadata } from "next";
import "./globals.css";
import { FolderProvider } from "@/context/FolderContext";
import { LinkProvider } from "@/context/LinkContext";

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
          <FolderProvider><LinkProvider>{children}</LinkProvider></FolderProvider>
        </body>
    </html>
  );
}
