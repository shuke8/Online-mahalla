import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DashboardNav } from "@/components/layout/DashboardNav";
import { BreadcrumbProvider } from "@/lib/breadcrumb-context";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Online Mahalla Dashboard",
  description:
    "Камбағалликни қисқартириш дастури мониторинг тизими",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-surface">
        <TooltipProvider>
          <BreadcrumbProvider>
            <DashboardNav />
            <main className="flex-1 px-3 sm:px-4 md:px-6 pb-4 md:pb-6 mt-4">
              {children}
            </main>
          </BreadcrumbProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
