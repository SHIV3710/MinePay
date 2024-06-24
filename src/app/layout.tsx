import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactProvider from "@/Redux/provider";
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/Redux/ThemeProvider";
import SocketContextProvider from "@/Context/SocketContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MinePay",
  description: "All In One Payment Gateway",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactProvider>
    <html lang="en">
        <body className={inter.className}>
          <SocketContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
            >
            {children}
            <Toaster />
          </ThemeProvider>
          </SocketContextProvider>
      </body>
    </html>
    </ReactProvider>
  );
}
