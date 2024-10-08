import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/shared/Header";
import { LoadingProvider } from "@/context/LoadingContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-hidden">
        <LoadingProvider>
          <Header />
          <main className={cn("min-h-screen bg-[#121212]", nunito.className)}>
            {children}
          </main>
        </LoadingProvider>
      </body>
    </html>
  );
}
