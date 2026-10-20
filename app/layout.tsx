import type { Metadata } from "next";
import type { ReactNode } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "./globals.css";

export const metadata: Metadata = {
  title: "OpenShelf - Thư viện số",
  description: "Thư viện số hỗ trợ khám phá sách và bài báo khoa học",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}
