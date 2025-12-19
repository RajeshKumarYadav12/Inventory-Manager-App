const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    sku: {
      type: String,
      required: [true, "SKU is required"],
      unique: true,
      uppercase: true,
      trim: true,
      maxlength: [50, "SKU cannot exceed 50 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
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
      ],
    },
    unit: {
      type: String,
      required: [true, "Unit is required"],
      enum: ["kg", "ton", "piece", "bag", "litre", "meter", "sqft", "cft"],
    },
    currentStock: {
      type: Number,
      required: [true, "Current stock is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    minStockLevel: {
      type: Number,
      required: [true, "Minimum stock level is required"],
      min: [0, "Minimum stock level cannot be negative"],
      default: 10,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual field for low stock indicator
productSchema.virtual("isLowStock").get(function () {
  return this.currentStock < this.minStockLevel;
});

// Index for better query performance
productSchema.index({ sku: 1 });
productSchema.index({ category: 1 });
productSchema.index({ isActive: 1 });

module.exports = mongoose.model("Product", productSchema);
