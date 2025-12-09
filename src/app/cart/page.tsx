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
  imageUrl: string;
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

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    // TODO: Implement API call to update quantity
    console.log(
      `Updating product ${productId} to quantity ${newQuantity}`
    );
    setCartItems(
      cartItems.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    // TODO: Implement API call to remove item
    console.log(`Removing product ${productId}`);
    setCartItems(cartItems.filter((item) => item._id !== productId));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-black text-2xl p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#F3F4F6] min-h-[calc(100vh-105px)] w-full p-4 sm:p-8">
      <div className=" md:min-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Shopping Cart
        </h1>
        {cartItems.length === 0 ? (
          <div className="text-center bg-white p-12 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Your cart is empty.
            </h2>
            <p className="text-gray-500 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              href={"/shop"}
              className="inline-block px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full items-start">
            {/* Cart Items Section */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  Cart Items
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="p-6 flex flex-col sm:flex-row gap-6"
                  >
                    <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={item.imageUrl || "https://placehold.co/200"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="grow flex flex-col">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-800">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {item.category}
                          </p>
                        </div>
                        <p className="font-bold text-lg text-gray-900">
                          &#8377;{item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="grow" />
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 border rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            -
                          </button>
                          <span className="w-10 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity + 1)
                            }
                            className="w-8 h-8 border rounded-md text-gray-600 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item._id)}
                          className="text-sm font-medium text-red-500 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="lg:col-span-1 bg-white rounded-2xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-4 mb-4">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    &#8377;{totalAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
              </div>
              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between font-bold text-lg text-gray-900">
                  <span>Total</span>
                  <span>&#8377;{totalAmount.toFixed(2)}</span>
                </div>
              </div>
              <Link
                href="/place-order"
                className="block w-full mt-6 bg-orange-500 text-white text-center py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
