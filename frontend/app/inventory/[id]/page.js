"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProduct, updateProduct } from "@/lib/api";
import AddProductForm from "@/components/AddProductForm";
import { useToast } from "@/components/ToastProvider";

export default function ProductDetailPage({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    loadProduct();
  }, [params.id]);

  const loadProduct = async () => {
    try {
      const data = await getProduct(params.id);
      setProduct(data);
    } catch (error) {
      console.error("Failed to load product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await updateProduct(params.id, formData);
      showToast("Product updated successfully!", "success");
      router.push("/inventory");
    } catch (error) {
      showToast("Failed to update product: " + error.message, "error");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Product</h1>
      <AddProductForm initialData={product} onSubmit={handleUpdate} />
    </div>
  );
}
