"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import ProductTable from "@/components/ProductTable";
import { Search } from "lucide-react";

export default function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    loadProducts();
  }, [categoryFilter]);

  const loadProducts = async () => {
    try {
      const data = await getProducts(categoryFilter);
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(filter.toLowerCase()) ||
      product.sku.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or SKU..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            <option value="Cement">Cement</option>
            <option value="Steel">Steel</option>
            <option value="Bricks">Bricks</option>
            <option value="Sand">Sand</option>
            <option value="Aggregate">Aggregate</option>
            <option value="Paint">Paint</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Hardware">Hardware</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <ProductTable products={filteredProducts} onUpdate={loadProducts} />
      )}
    </div>
  );
}
