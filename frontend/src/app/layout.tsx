import NavBar from "@/components/NavBar";
import Providers from "@/components/Providers";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Note manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="container mx-auto px-2">
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
