import type { Metadata } from "next";
import { Cookie, Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./index.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cookie = Cookie({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quốc Hoàng & Ngọc Đăng | Wedding Invitation",
  description:
    "Save the date and celebrate the wedding of Quốc Hoàng & Ngọc Đăng ",
  openGraph: {
    title: "Quốc Hoàng & Ngọc Đăng | Wedding Invitation",
    description:
      "Save the date and celebrate the wedding of Quốc Hoàng & Ngọc Đăng.",
    type: "website",
  },
  icons: {
    icon: "/wedding-ring.png",
    shortcut: "/wedding-ring.png",
    apple: "/wedding-ring.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${manrope.variable} ${cookie.variable}`}>
        {children}
      </body>
    </html>
  );
}
