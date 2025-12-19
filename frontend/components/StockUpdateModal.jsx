"use client";

import { useState } from "react";
import { updateStock } from "@/lib/api";
import { X, Plus, Minus, Edit3 } from "lucide-react";
import { useToast } from "@/components/ToastProvider";

export default function StockUpdateModal({ product, onClose, onUpdate }) {
  const [action, setAction] = useState("IN");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateStock(product._id, {
        action,
        quantity: parseFloat(quantity),
      });
      showToast("Stock updated successfully!", "success");
      onUpdate();
    } catch (error) {
      showToast("Failed to update stock: " + error.message, "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getNewStock = () => {
    const qty = parseFloat(quantity) || 0;
    switch (action) {
      case "IN":
        return product.currentStock + qty;
      case "OUT":
        return Math.max(0, product.currentStock - qty);
      case "ADJUST":
        return qty;
      default:
        return product.currentStock;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Update Stock</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
          <p className="text-sm text-gray-600">SKU: {product.sku}</p>
          <p className="text-sm font-semibold text-gray-900 mt-2">
            Current Stock: {product.currentStock} {product.unit}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Action
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setAction("IN")}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors ${
                  action === "IN"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <Plus className="w-4 h-4" />
                Stock In
              </button>
              <button
                type="button"
                onClick={() => setAction("OUT")}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors ${
                  action === "OUT"
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <Minus className="w-4 h-4" />
                Stock Out
              </button>
              <button
                type="button"
                onClick={() => setAction("ADJUST")}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors ${
                  action === "ADJUST"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <Edit3 className="w-4 h-4" />
                Adjust
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {action === "ADJUST" ? "New Stock Quantity" : "Quantity"}
            </label>
            <input
              type="number"
              id="quantity"
              required
              min="0"
              step="0.01"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter quantity"
            />
          </div>

          {quantity && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">New Stock:</span>{" "}
                {getNewStock()} {product.unit}
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !quantity}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Stock"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
