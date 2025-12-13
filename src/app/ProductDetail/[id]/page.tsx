"use client";
import { useState, useEffect } from "react";
import { ProductStruct } from "../../../../types";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

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
      toast.error("Please login first");
      router.push("/login");
      return;
    }

    try {
      const res = await axios.post("/api/cart/update", {
        userId: userId,
        itemId: product?._id,
      });

      if (res.data.success) {
        toast.success("Success! Item added to cart");
        router.refresh();
      }
    } catch (error) {
      console.log("Error in adding to cart: ", error);
      toast.error("Failed to add Product");
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
    <div className="w-full flex min-h-[calc(100vh-110px)] md:h-[calc(100vh-110px)]  bg-[#F3F4F6] ">
      <div className="w-full flex flex-col md:flex-row  gap-4 md:gap-2 p-4 rounded-2xl ">
        <div className="border p-2 left flex justify-center rounded-2xl w-full md:w-3/5  bg-white">
          <div className="flex w-2/3 justify-center overflow-hidden">
            <img
              src={product.imageUrl || "https://placehold.co/400x400"}
              alt={product.name}
              className="object-cover w-full aspect-square"
            />
          </div>
        </div>
        <div className="right w-full md:w-2/5   flex flex-col items-baseline justify-between bg-white border rounded-2xl">
          <div className="p-2 w-full ">
            <h1 className="p-2 text-4xl font-semibold border-b pb-5">
              {product.name}
            </h1>
            <h3 className="p-2 font-semibold text-3xl pb-10 text-orange-500">
              &#8377;{product.price}
            </h3>
            <div className="p-2 text-gray-700">
              <p className="font-semibold text-2xl pb-4">About this item</p>
              {product.description}
            </div>
          </div>
          <div className="border w-full flex justify-center items-center p-2  rounded-b-2xl ">
            <button
              onClick={addToCart}
              className="cursor-pointer p-8 bg-orange-500 text-2xl font-semibold hover:scale-102 transition-all duration-300 hover:shadow-2xs w-full rounded-2xl "
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
