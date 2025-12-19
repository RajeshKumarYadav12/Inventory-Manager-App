const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET /api/alerts/low-stock - Get low stock products
router.get("/low-stock", async (req, res, next) => {
  try {
    const products = await Product.find({ isActive: true });

    // Filter products where currentStock < minStockLevel
    const lowStockProducts = products.filter((product) => product.isLowStock);

    res.json({
      success: true,
      count: lowStockProducts.length,
      data: lowStockProducts,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/alerts/stats - Get inventory statistics
router.get("/stats", async (req, res, next) => {
  try {
    const products = await Product.find({ isActive: true });

    const stats = {
      totalProducts: products.length,
      lowStockCount: products.filter((p) => p.isLowStock).length,
      totalStockValue: products.reduce((sum, p) => sum + p.currentStock, 0),
      categoryBreakdown: {},
    };

    // Calculate category breakdown
    products.forEach((product) => {
      if (!stats.categoryBreakdown[product.category]) {
        stats.categoryBreakdown[product.category] = {
          count: 0,
          totalStock: 0,
        };
      }
      stats.categoryBreakdown[product.category].count++;
      stats.categoryBreakdown[product.category].totalStock +=
        product.currentStock;
    });

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
