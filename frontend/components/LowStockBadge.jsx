import { AlertTriangle, CheckCircle } from "lucide-react";

export default function LowStockBadge({ product }) {
  if (product.isLowStock) {
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
        <AlertTriangle className="w-3 h-3" />
        Low Stock
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
      <CheckCircle className="w-3 h-3" />
      In Stock
    </span>
  );
}
