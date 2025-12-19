require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const errorHandler = require("./middleware/errorHandler");
const productsRoutes = require("./routes/products");
const alertsRoutes = require("./routes/alerts");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Inventory Management API",
    version: "1.0.0",
    endpoints: {
      products: "/api/products",
      alerts: "/api/alerts",
    },
  });
});

app.use("/api/products", productsRoutes);
app.use("/api/alerts", alertsRoutes);

// Error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
