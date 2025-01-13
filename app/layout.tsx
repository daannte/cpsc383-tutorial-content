import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dante Tutorial Content",
  description: "My Tutorial Content for CPSC383",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="max-w-7xl mx-auto p-6">{children}</body>
    </html>
  );
}
