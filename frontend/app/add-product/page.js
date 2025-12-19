"use client";

import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/api";
import AddProductForm from "@/components/AddProductForm";
import { useToast } from "@/components/ToastProvider";

export default function AddProductPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const handleSubmit = async (formData) => {
    try {
      await createProduct(formData);
      showToast("Product added successfully!", "success");
      router.push("/inventory");
    } catch (error) {
      showToast("Failed to add product: " + error.message, "error");
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Add New Product</h1>
      <AddProductForm onSubmit={handleSubmit} />
    </div>
  );
}
