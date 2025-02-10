import type { Metadata } from "next";

import "./globals.css";
import RootProvider from "@/Providers/RootProvider";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";

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
        <head>
          <link
            rel="icon"
            href="/assets/images/icon?<generated>"
            type="image/<generated>"
            sizes="<generated>"
          />
        </head>
        <body>
          <Navbar />
          {children}
          <Toaster />
        </body>
      </html>
    </RootProvider>
  );
}
