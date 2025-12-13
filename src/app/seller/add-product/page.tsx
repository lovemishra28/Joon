"use client";

import axios from "axios";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { CloudUploadIcon, ImagePlus, Trash2, XIcon } from "lucide-react";
import toast from "react-hot-toast";

export default function AddProductPage() {
  const [productData, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: [] as string[],
  });
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setProduct({ ...productData, [e.target.name]: e.target.value });
  };

  const handleUpload = (result: any) => {
    if (result.event === "success") {
      const newImageUrl = result.info.secure_url;
      if (productData.imageUrl.length < 5) {
        setProduct((prev) => ({
          ...prev,
          imageUrl: [...prev.imageUrl, newImageUrl],
        }));
      } else {
        toast.error("You can upload a maximum of 5 images.");
      }
    }
  };

  const handleRemoveImage = (urlToRemove: string) => {
    setProduct((prev) => ({
      ...prev,
      imageUrl: prev.imageUrl.filter((url) => url !== urlToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (productData.imageUrl.length === 0) {
      setError("Please upload at least one image.");
      return;
    }

    try {
      const response = await axios.post("/api/product/add", productData);
      if (response.data.success) {
        toast.success("Product added successfully!");
        setProduct({
          name: "",
          description: "",
          price: "",
          category: "",
          imageUrl: [],
        });
      }
    } catch (error) {
      console.error(error);
      setError("Error adding product. Please try again.");
      toast.error("Error adding product. Please try again.");
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-[#F3F4F6]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Add New Product
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-8 rounded-2xl shadow-md space-y-8"
        >
          {/* Image Uploader */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images (up to 5)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
              {productData.imageUrl.map((url) => (
                <div key={url} className="relative aspect-square">
                  <img
                    src={url}
                    alt="Uploaded product"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(url)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                  >
                    <XIcon className="w-3 h-3 "/>
                  </button>
                </div>
              ))}
              {productData.imageUrl.length < 5 && (
                <CldUploadWidget
                  uploadPreset="joon_preset"
                  onSuccess={handleUpload}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-orange-500 hover:text-orange-500 transition"
                    >
                      <ImagePlus className="w-8 h-8" />
                      <span className="mt-2 text-xs font-semibold">
                        Add Image
                      </span>
                    </button>
                  )}
                </CldUploadWidget>
              )}
            </div>
          </div>

          {/* Product Details Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <div className="md:col-span-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Product Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                placeholder="e.g. Modern Armchair"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={productData.description}
                onChange={handleChange}
                placeholder="Describe the product features, materials, etc."
                rows={4}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Price (₹)
              </label>
              <input
                id="price"
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
                placeholder="e.g. 9999"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={productData.category}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Furniture">Furniture</option>
                <option value="Hardware">Hardware</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <div className="pt-4 border-t ">
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
