// Formatting utilities

export const formatNumber = (num) => {
  return new Intl.NumberFormat("en-IN").format(num);
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

export const formatStockStatus = (currentStock, minStockLevel) => {
  if (currentStock === 0) {
    return { label: "Out of Stock", color: "red" };
  } else if (currentStock < minStockLevel) {
    return { label: "Low Stock", color: "orange" };
  } else {
    return { label: "In Stock", color: "green" };
  }
};

export const getStockPercentage = (currentStock, minStockLevel) => {
  if (minStockLevel === 0) return 100;
  return Math.min(100, (currentStock / minStockLevel) * 100);
};
