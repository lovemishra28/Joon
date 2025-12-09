"use client";

import axios from "axios";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { CloudUploadIcon } from "lucide-react";

export default function addProduct() {
  const [productData, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: [] as string[],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setProduct({ ...productData, [e.target.name]: e.target.value });
  };

  const handleUpload = (result: any) => {
    if (result.event === "success") {
      const imageUrl = result.info.secure_url;
      setProduct((prev) => ({
        ...prev,
        image: [...prev.image, imageUrl],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/product/add", productData);
      if (response.data.success) {
        alert("Product added successfully!");
        setProduct({
          name: "",
          description: "",
          price: "",
          category: "",
          image: [],
        });
      }
    } catch (error) {
      console.error(error);
      alert("Error adding product");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10 ">
      <h1 className="text-2xl font-bold">Add Product</h1>
      <form
        className=" border p-2 flex flex-col gap-2 "
        onSubmit={handleSubmit}
      >
        <div className="p-2 flex justify-center items-center">
          <CldUploadWidget uploadPreset="joon_preset" onSuccess={handleUpload}>
            {({ open }) => {
              return (
                <div>
                  <button
                    type="button"
                    onClick={() => open()}
                    className="border cursor-pointer flex gap-2 p-2 rounded"
                  >
                    <CloudUploadIcon />
                    Upload Image
                  </button>
                </div>
              );
            }}
          </CldUploadWidget>
        </div>
        <div className="flex overflow-scroll p-2 gap-2">
          {productData.image.map((url, index) => (
            <div key={index} className="w-1/6 aspect-square">
              <img src={url} alt="imagehere" className="w-full h-full" />
            </div>
          ))}
        </div>

        <div className="flex flex-col p-2 border gap-4">
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            placeholder="Name"
            className="p-2 border"
          />
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            placeholder="Description"
            className="p-2 border"
          />
          <input
            type="text"
            name="price"
            value={productData.price}
            onChange={handleChange}
            placeholder="Price"
            className="p-2 border"
          />
        </div>
        <div className="w-full p-2">
          <select
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="border"
          >
            <option value="">Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Furniture">Furniture</option>
            <option value="Hardware">Hardware</option>
            <option value="Hardware">Others</option>
          </select>
        </div>

        <div className="w-full flex justify-center items-center">
          <button
            className="border bg-black text-white rounded p-2 hover:bg-gray-800"
            type="submit"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
