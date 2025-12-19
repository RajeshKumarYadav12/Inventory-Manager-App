"use client";

import { useEffect, useState } from "react";
import { getLowStockProducts } from "@/lib/api";
import LowStockBadge from "@/components/LowStockBadge";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function AlertsPage() {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLowStockProducts();
  }, []);

  const loadLowStockProducts = async () => {
    try {
      const data = await getLowStockProducts();
      setLowStockProducts(data);
    } catch (error) {
      console.error("Failed to load low stock products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <AlertTriangle className="w-8 h-8 text-red-500" />
        <h1 className="text-3xl font-bold text-gray-900">Low Stock Alerts</h1>
      </div>

      {lowStockProducts.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-green-500 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            All Stock Levels Good!
          </h2>
          <p className="text-gray-600">
            No products are currently below minimum stock level.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-red-50 border-b border-red-200 px-6 py-4">
            <p className="text-red-800 font-medium">
              {lowStockProducts.length} product
              {lowStockProducts.length !== 1 ? "s" : ""} require attention
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Min Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lowStockProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{product.sku}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {product.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-red-600">
                        {product.currentStock} {product.unit}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {product.minStockLevel} {product.unit}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <LowStockBadge product={product} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        href={`/inventory/${product._id}`}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                      >
                        Update Stock
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
