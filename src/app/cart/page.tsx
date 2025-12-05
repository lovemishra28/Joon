"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CartItems {
  _id: string;
  name: string;
  price: number;
  offerPrice: number;
  image: string;
  category: string;
  quantity: number;
}

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCart = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Please login to access the cart");
        router.push("/login");
      }

      try {
        const response = await axios.post("/api/cart/get", { userId });
        if (response.data.success) {
          setCartItems(response.data.cartProducts || []);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    getCart();
  }, [router]);

  const totalAmount = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-black text-2xl p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-3">
      <h1 className="text-2xl pt-4 font-bold capitalize">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className=" p-4 flex flex-col items-center border transition rounded absolute top-1/2 -translate-y-1/2">
          <p className="pb-6 text-6xl font-bold">Cart is empty</p>
          <Link
            href={"/shop"}
            className="border p-[5px] border-orange-400 hover:bg-orange-400 transition rounded text-sm"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex justify-center gap-4 w-full border py-4 px-16 ">
          <div className="left border w-7/10 min-h-10 max-h-[500px] overflow-auto">
            {cartItems.map((item) => (
              <div key={item._id} className="flex border justify-around p-4">
                <div className="image border p-2">
                  <img
                    src={item.image || "https://placehold.co/200"}
                    alt={item.name}
                  />
                </div>
                <div className="flex justify-between items-center border p-2 w-full grow">
                  <div className="p-4">
                    <h1 className="font-bold text-3xl">{item.name}</h1>
                    <p>Quantity: {item.quantity}</p>
                    <p>{item.category}</p>
                  </div>
                  <div className="p-4 font-bold text-2xl">
                    <p>{item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="right border flex flex-col w-1/3 min-h-10 p-3 gap-3">
            <h1 className=" text-center font-bold text-2xl pt-2">
              Order summary
            </h1>
            <div className="border grow p-4">
              <div className="border p-4">
                <div className="flex justify-around text-xl font-bold mb-2">
                  <span>Subtotal: </span>
                  <span>{totalAmount}</span>
                </div>
                <div className="flex justify-around text-xl font-bold mb-2">
                  <span>Shipping fee: </span>
                  <span>free</span>
                </div>
              </div>
              <div className="flex justify-around text-xl font-bold mb-6 p-4">
                <span>Total</span>
                <span>{totalAmount}</span>
              </div>
            </div>
            <Link
              href="/place-order"
              className="block w-full bg-black text-white text-center py-3 rounded-md font-semibold hover:bg-gray-800 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
