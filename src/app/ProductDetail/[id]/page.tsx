"use client";
import { useState, useEffect } from "react";
import { ProductStruct } from "../../../../types";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function productDetailPage() {
  const router = useRouter();
  const params = useParams();

  const [product, setProduct] = useState<ProductStruct | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.post("/api/product/overview", {
          productId: params.id,
        });

        if (res.data.success) {
          setProduct(res.data.product);
        }
      } catch (error) {
        console.error("Error in fetching product: ", error);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) {
      getProduct();
    }
  }, [params.id]);

  const addToCart = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first");
      router.push("/login");
      return;
    }

    try {
      const res = await axios.post("/api/cart/update", {
        userId: userId,
        itemId: product?._id,
      });

      if (res.data.success) {
        alert("Success! Item added to cart");
        router.refresh();
      }
    } catch (error) {
      console.log("Error in adding to cart: ", error);
      alert("Failed to add Product");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-black text-2xl p-10">
        Loading...
      </div>
    );
  }
  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen text-black text-2xl p-10">
        Product Not found
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row w-full  justify-center gap-4 md:gap-2 pt-4 ">
      <div className="border p-2 left flex justify-center items-center w-full md:w-1/3">
        <div className="border p-2">
          <img
            src={product.imageUrl || "https://placehold.co/400x400"}
            alt={product.name}
            width={400}
            height={400}
          />
        </div>
      </div>
      <div className="right w-full md:w-1/2 flex flex-col items-baseline justify-between border ">
        <div className="p-2 w-full md:w-6/10">
          <h1 className="p-2 text-4xl font-bold">{product.name}</h1>
          <p className="p-2 text-gray-700">{product.description}</p>
          <h3 className="p-2 font-semibold text-2xl">{product.price}</h3>
        </div>
        <div className="border w-full flex justify-center items-center p-2">
          <button onClick={addToCart} className="cursor-pointer">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
