import "./globals.css";
import Navbar from "@/components/Navbar";
import { ToastProvider } from "@/components/ToastProvider";

export const metadata = {
  title: "Inventory Management System",
  description: "Building Material Supplier Inventory Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <ToastProvider>
          <Navbar />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </ToastProvider>
      </body>
    </html>
  );
}
