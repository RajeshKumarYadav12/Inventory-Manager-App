const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Helper function for API calls
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;

  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data.data || data;
}

// Product APIs
export const getProducts = async (category = "") => {
  const params = new URLSearchParams();
  if (category) params.append("category", category);
  params.append("isActive", "true");
  const query = params.toString() ? `?${params.toString()}` : "";
  return fetchAPI(`/api/products${query}`);
};

export const getProduct = async (id) => {
  return fetchAPI(`/api/products/${id}`);
};

export const createProduct = async (productData) => {
  return fetchAPI("/api/products", {
    method: "POST",
    body: JSON.stringify(productData),
  });
};

export const updateProduct = async (id, productData) => {
  return fetchAPI(`/api/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(productData),
  });
};

export const updateStock = async (id, stockData) => {
  return fetchAPI(`/api/products/${id}/stock`, {
    method: "PATCH",
    body: JSON.stringify(stockData),
  });
};

export const deleteProduct = async (id) => {
  return fetchAPI(`/api/products/${id}`, {
    method: "DELETE",
  });
};

// Alerts APIs
export const getLowStockProducts = async () => {
  return fetchAPI("/api/alerts/low-stock");
};

export const getStats = async () => {
  return fetchAPI("/api/alerts/stats");
};
