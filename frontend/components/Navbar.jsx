"use client";

import Link from "next/link";
import { Package, Home, AlertTriangle, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getLowStockProducts } from "@/lib/api";

export default function Navbar() {
  const [lowStockCount, setLowStockCount] = useState(0);

  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const data = await getLowStockProducts();
        setLowStockCount(data.length);
      } catch (error) {
        console.error("Failed to load low stock count:", error);
      }
    };

    fetchLowStock();
    const interval = setInterval(fetchLowStock, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Package className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">
              Inventory Manager
            </span>
          </Link>

          <div className="flex space-x-1">
            <Link
              href="/"
              className="flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
            >
              <Home className="w-5 h-5" />
              <span className="hidden md:inline">Dashboard</span>
            </Link>
            <Link
              href="/inventory"
              className="flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
            >
              <Package className="w-5 h-5" />
              <span className="hidden md:inline">Inventory</span>
            </Link>
            <Link
              href="/alerts"
              className="flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 relative"
            >
              <AlertTriangle className="w-5 h-5" />
              <span className="hidden md:inline">Alerts</span>
              {lowStockCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {lowStockCount}
                </span>
              )}
            </Link>
            <Link
              href="/add-product"
              className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-white"
            >
              <PlusCircle className="w-5 h-5" />
              <span className="hidden md:inline">Add Product</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
