import type { Metadata } from "next";

import "./globals.css";
import RootProvider from "@/Providers/RootProvider";

export const metadata: Metadata = {
  title: "FizzBuzzPT",
  description: "A simple FizzBuzz implementation in TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RootProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </RootProvider>
  );
}
