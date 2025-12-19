"use client";

import { useState } from "react";

const CATEGORIES = [
  "Cement",
  "Steel",
  "Bricks",
  "Sand",
  "Aggregate",
  "Paint",
  "Plumbing",
  "Electrical",
  "Hardware",
  "Other",
];

const UNITS = ["kg", "ton", "piece", "bag", "litre", "meter", "sqft", "cft"];

export default function AddProductForm({ initialData, onSubmit }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    sku: initialData?.sku || "",
    category: initialData?.category || "",
    unit: initialData?.unit || "",
    currentStock: initialData?.currentStock ?? "",
    minStockLevel: initialData?.minStockLevel ?? "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "currentStock" || name === "minStockLevel"
          ? value === ""
            ? ""
            : parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow p-6 space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Product Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Portland Cement"
          />
        </div>

        <div>
          <label
            htmlFor="sku"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            SKU *
          </label>
          <input
            type="text"
            id="sku"
            name="sku"
            required
            value={formData.sku}
            onChange={handleChange}
            disabled={!!initialData}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
            placeholder="e.g., CEM-001"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Category *
          </label>
          <select
            id="category"
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="unit"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Unit *
          </label>
          <select
            id="unit"
            name="unit"
            required
            value={formData.unit}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Unit</option>
            {UNITS.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="currentStock"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Current Stock *
          </label>
          <input
            type="number"
            id="currentStock"
            name="currentStock"
            required
            step="0.01"
            value={formData.currentStock}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter current stock"
          />
        </div>

        <div>
          <label
            htmlFor="minStockLevel"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Minimum Stock Level *
          </label>
          <input
            type="number"
            id="minStockLevel"
            name="minStockLevel"
            required
            min="0"
            step="0.01"
            value={formData.minStockLevel}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter minimum stock level"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          {initialData ? "Update Product" : "Add Product"}
        </button>
      </div>
    </form>
  );
}
