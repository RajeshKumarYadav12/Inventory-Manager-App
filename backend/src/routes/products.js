const express = require("express");
const router = express.Router();
const { body, param, validationResult } = require("express-validator");
const Product = require("../models/Product");

// Validation middleware helper
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

// GET /api/products - Get all products
router.get("/", async (req, res, next) => {
  try {
    const { category, isActive } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (isActive !== undefined) filter.isActive = isActive === "true";

    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/products/:id - Get single product
router.get(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid product ID")],
  validate,
  async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      res.json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
);

// POST /api/products - Create new product
router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Product name is required"),
    body("sku").trim().notEmpty().withMessage("SKU is required"),
    body("category")
      .isIn([
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
      ])
      .withMessage("Invalid category"),
    body("unit")
      .isIn(["kg", "ton", "piece", "bag", "litre", "meter", "sqft", "cft"])
      .withMessage("Invalid unit"),
    body("currentStock")
      .isFloat({ min: 0 })
      .withMessage("Stock must be a positive number"),
    body("minStockLevel")
      .isFloat({ min: 0 })
      .withMessage("Minimum stock level must be a positive number"),
  ],
  validate,
  async (req, res, next) => {
    try {
      const product = await Product.create(req.body);

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "SKU already exists",
        });
      }
      next(error);
    }
  }
);

// PUT /api/products/:id - Update product
router.put(
  "/:id",
  [
    param("id").isMongoId().withMessage("Invalid product ID"),
    body("name")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Product name cannot be empty"),
    body("category")
      .optional()
      .isIn([
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
      ])
      .withMessage("Invalid category"),
    body("unit")
      .optional()
      .isIn(["kg", "ton", "piece", "bag", "litre", "meter", "sqft", "cft"])
      .withMessage("Invalid unit"),
    body("currentStock")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Stock must be a positive number"),
    body("minStockLevel")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Minimum stock level must be a positive number"),
  ],
  validate,
  async (req, res, next) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      res.json({
        success: true,
        message: "Product updated successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
);

// PATCH /api/products/:id/stock - Update stock only
router.patch(
  "/:id/stock",
  [
    param("id").isMongoId().withMessage("Invalid product ID"),
    body("action")
      .isIn(["IN", "OUT", "ADJUST"])
      .withMessage("Action must be IN, OUT, or ADJUST"),
    body("quantity")
      .isFloat({ min: 0 })
      .withMessage("Quantity must be a positive number"),
  ],
  validate,
  async (req, res, next) => {
    try {
      const { action, quantity } = req.body;
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      let newStock = product.currentStock;

      switch (action) {
        case "IN":
          newStock += quantity;
          break;
        case "OUT":
          newStock -= quantity;
          if (newStock < 0) {
            return res.status(400).json({
              success: false,
              message: "Insufficient stock",
            });
          }
          break;
        case "ADJUST":
          newStock = quantity;
          break;
      }

      product.currentStock = newStock;
      await product.save();

      res.json({
        success: true,
        message: "Stock updated successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
);

// DELETE /api/products/:id - Soft delete product
router.delete(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid product ID")],
  validate,
  async (req, res, next) => {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        { isActive: false },
        { new: true }
      );

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      res.json({
        success: true,
        message: "Product deleted successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
