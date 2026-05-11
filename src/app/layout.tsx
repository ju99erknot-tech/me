import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ju99erknot",
  description: "Personal digital business card",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
