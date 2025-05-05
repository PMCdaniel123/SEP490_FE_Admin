import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";
import { ToastContainer } from "react-toastify";
import { Providers } from "@/stores/Providers";
import { ThemeProvider } from "next-themes";
import RootLayoutClient from "@/components/layout/root-layout-client";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WorkHive Administrator",
  description:
    "WorkHive was developed as a groundbreaking solution for managing and booking coworking spaces. This platform is designed to provide a professional, centralized, and convenient system, optimizing the management of bookings, organizing information, and supporting events for coworking spaces. WorkHive not only benefits users of these services but also effectively supports coworking space owners in enhancing service quality and expanding their market presence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Providers>
            <RootLayoutClient>{children}</RootLayoutClient>
          </Providers>
        </ThemeProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
