"use client";

import { useEffect, useState } from "react";
import { getStats } from "@/lib/api";
import StatsCard from "@/components/StatsCard";
import Link from "next/link";
import { Package, AlertTriangle, TrendingUp, BarChart3 } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to load stats:", error);
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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <Link
          href="/add-product"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Add Product
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Products"
          value={stats?.totalProducts || 0}
          icon={<Package className="w-8 h-8" />}
          color="blue"
        />
        <StatsCard
          title="Low Stock Alerts"
          value={stats?.lowStockCount || 0}
          icon={<AlertTriangle className="w-8 h-8" />}
          color="red"
        />
        <StatsCard
          title="Total Stock Units"
          value={stats?.totalStockValue || 0}
          icon={<TrendingUp className="w-8 h-8" />}
          color="green"
        />
        <StatsCard
          title="Categories"
          value={Object.keys(stats?.categoryBreakdown || {}).length}
          icon={<BarChart3 className="w-8 h-8" />}
          color="purple"
        />
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Category Breakdown
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Stock
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats?.categoryBreakdown &&
                Object.entries(stats.categoryBreakdown).map(
                  ([category, data]) => (
                    <tr key={category}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.count}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.totalStock}
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/inventory"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            View Inventory
          </h3>
          <p className="text-gray-600">Browse all products and stock levels</p>
        </Link>
        <Link
          href="/alerts"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Low Stock Alerts
          </h3>
          <p className="text-gray-600">Check products below minimum level</p>
        </Link>
        <Link
          href="/add-product"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Add New Product
          </h3>
          <p className="text-gray-600">Register new inventory items</p>
        </Link>
      </div>
    </div>
  );
}
