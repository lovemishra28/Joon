"use client";

import ProductItem from "../../../components/ProductItems";
import { useEffect, useState } from "react";
import { ProductStruct } from "../../../types";

export default function shopPage() {
  const [products, setProduct] = useState<ProductStruct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("/api/product/list");
        const data = await res.json();

        if (data.success) {
          setProduct(data.products);
        }
      } catch (error) {
        console.log("Failed to fetch Products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-black text-2xl p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center bg-[#F3F4F6]">
      <h1 className="text-center p-8 text-4xl font-bold">All Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 px-16 py-8">
        {products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
