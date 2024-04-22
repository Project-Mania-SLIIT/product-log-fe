import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

import Providers from "@utils/Providers";

const font = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product Backlog",
  description: "Product Backlog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={font.style}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
