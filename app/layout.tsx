import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import LayoutWrapper from "./layoutWrapper";
import { Toaster } from "@/components/ui/sonner";
import { ReduxProvider } from "@/redux/reduxProvider";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});



const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});


export const metadata: Metadata = {
  title: "Newsglance",
  description: "AI supercharged NEWS platform",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable} antialiased relative`}>

        <ReduxProvider>

          <LayoutWrapper>{children}</LayoutWrapper>

          <Toaster richColors closeButton duration={3000} position="top-right" />

        </ReduxProvider>

      </body>
    </html>
  );
}
