import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "500", "600", "700", "800", "900"],
  style: "normal",
});

// SEO metadata
export const metadata: Metadata = {
  title: "PDF Wisdom",
  description: "CHat with any PDF document",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>
          <ToastContainer />
          <div className="bg-[#faf9f6]">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
