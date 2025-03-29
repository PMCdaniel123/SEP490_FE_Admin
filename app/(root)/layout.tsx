import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";
import TopNav from "@/components/layout/top-nav";
import Sidebar from "@/components/layout/sidebar";
import { ToastContainer } from "react-toastify";
import { Providers } from "@/stores/Providers";
import { ThemeProvider } from "next-themes";

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
            <div className="flex bg-third p-4 gap-4 min-h-screen w-full">
              <div className="h-fit sticky top-4">
                <Sidebar />
              </div>
              <main className="flex-1">
                <TopNav />
                {children}
              </main>
            </div>
          </Providers>
        </ThemeProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
