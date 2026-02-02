import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "kartikk.io",
  description: "Design Engineer building exceptional products.",
  openGraph: {
    title: "kartikk.io",
    description: "Design Engineer building exceptional products.",
    images: [
      {
        url: "/og.png",
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
