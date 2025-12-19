"use client";

import { useState } from "react";
import Link from "next/link";
import { deleteProduct } from "@/lib/api";
import LowStockBadge from "./LowStockBadge";
import StockUpdateModal from "./StockUpdateModal";
import { Edit, Trash2, Package } from "lucide-react";
import { useToast } from "@/components/ToastProvider";

export default function ProductTable({ products, onUpdate }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showStockModal, setShowStockModal] = useState(false);
  const { showToast } = useToast();

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        showToast("Product deleted successfully", "success");
        onUpdate();
      } catch (error) {
        showToast("Failed to delete product: " + error.message, "error");
        console.error(error);
      }
    }
  };

  const handleStockUpdate = (product) => {
    setSelectedProduct(product);
    setShowStockModal(true);
  };

  const handleStockUpdateComplete = () => {
    setShowStockModal(false);
    setSelectedProduct(null);
    onUpdate();
  };

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No products found
        </h3>
        <p className="text-gray-600 mb-4">
          Get started by adding your first product.
        </p>
        <Link
          href="/add-product"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Add Product
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
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
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Min Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
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
                    <button
                      onClick={() => handleStockUpdate(product)}
                      className="text-sm font-semibold text-blue-600 hover:text-blue-900"
                    >
                      {product.currentStock} {product.unit}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {product.minStockLevel} {product.unit}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <LowStockBadge product={product} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Link
                      href={`/inventory/${product._id}`}
                      className="text-blue-600 hover:text-blue-900 inline-flex items-center gap-1"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:text-red-900 inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showStockModal && selectedProduct && (
        <StockUpdateModal
          product={selectedProduct}
          onClose={() => setShowStockModal(false)}
          onUpdate={handleStockUpdateComplete}
        />
      )}
    </>
  );
}
