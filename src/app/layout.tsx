import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Latvian Jumping Federation",
  description: "The official website of the LJF.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        {children}
        <footer className="py-8 border-t border-gray-100 mt-auto bg-white">
          <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} LJF. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
