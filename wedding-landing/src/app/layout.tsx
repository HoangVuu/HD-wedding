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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hd-wedding-zeta.vercel.app/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Quốc Hoàng & Ngọc Đăng | Wedding Invitation",
  description:
    "Save the date and celebrate the wedding of Quốc Hoàng & Ngọc Đăng ",
  openGraph: {
    title: "Quốc Hoàng & Ngọc Đăng | Wedding Invitation",
    description:
      "Save the date and celebrate the wedding of Quốc Hoàng & Ngọc Đăng.",
    type: "website",
    url: "/",
    siteName: "Quốc Hoàng & Ngọc Đăng Wedding",
    images: [
      {
        url: "/media/t3-min.jpg",
        width: 1200,
        height: 630,
        alt: "Quốc Hoàng & Ngọc Đăng Wedding Invitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quốc Hoàng & Ngọc Đăng | Wedding Invitation",
    description:
      "Save the date and celebrate the wedding of Quốc Hoàng & Ngọc Đăng.",
    images: ["/media/t3-min.jpg"],
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
