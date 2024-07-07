import type { Metadata } from "next";
import Notification from "@/components/Notification";

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MyStoreProvider from "@/store";
import AuthProvider from "./Providers";
import CrispProvider from "@/components/Crisp-Provider";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZaGull's",
  description: "A Hand Crafted Jewellery Store",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CrispProvider />
      <body className={inter.className}>
        <AuthProvider>
          <MyStoreProvider>
            <div className="bg-[#f3f0e9]">
              <Notification />
              <Navbar />
              {children}
              <Footer />
            </div>
          </MyStoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
