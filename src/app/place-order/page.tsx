"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function placeOrder() {
  const router = useRouter();
  const [payment, setPayment] = useState("");
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
  });

  const handlePlaceOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Please Login first");
      router.push("/login");
      return;
    }
    try {
      const response = await axios.post("/api/order/place", {
        userId: userId,
        address: address,
        payment: payment,
      });

      if (response.data.success) {
        toast.success("Order placed successfully!");
        router.push("/myOrders");
      } else {
        toast.error("Failed: " + response.data.message);
      }
    } catch (error) {
      toast.error("Unable to process order");
      console.log("Error in placing order :", error);
    }
  };

  return (
    <div className="bg-[#F3F4F6] min-h-[calc(100vh-120px)] w-full p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Delivery Information
        </h1>
        <form
          onSubmit={handlePlaceOrder}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Shipping Details Column */}
          <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Shipping Address
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="John"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                  value={address.firstName}
                  onChange={(e) =>
                    setAddress({ ...address, firstName: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Doe"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                  value={address.lastName}
                  onChange={(e) =>
                    setAddress({ ...address, lastName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="john.doe@example.com"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                  value={address.email}
                  onChange={(e) =>
                    setAddress({ ...address, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="street"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Street Address
                </label>
                <input
                  type="text"
                  id="street"
                  placeholder="123 Main St"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                  value={address.street}
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  placeholder="Anytown"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  State / Province
                </label>
                <input
                  type="text"
                  id="state"
                  placeholder="State"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                  value={address.state}
                  onChange={(e) =>
                    setAddress({ ...address, state: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="zipcode"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  ZIP / Postal Code
                </label>
                <input
                  type="text"
                  id="zipcode"
                  placeholder="12345"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                  value={address.zipcode}
                  onChange={(e) =>
                    setAddress({ ...address, zipcode: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="(123) 456-7890"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                  value={address.phone}
                  onChange={(e) =>
                    setAddress({ ...address, phone: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Method Column */}
          <div className="md:col-span-1">
            <div className="bg-white p-8 rounded-2xl shadow-md h-full flex flex-col">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                Payment Method
              </h2>
              <div className="space-y-4 grow">
                <label className="flex items-center p-4 border rounded-lg has-checked:bg-orange-50 has-checked:border-orange-400 transition cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={payment === "COD"}
                    onChange={(e) => setPayment(e.target.value)}
                    className="h-4 w-4 text-orange-500 border-gray-300 focus:ring-orange-400"
                    required
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    Cash on Delivery
                  </span>
                </label>
                <label className="flex items-center p-4 border rounded-lg has-checked:bg-orange-50 has-checked:border-orange-400 transition cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="UPI/Card"
                    checked={payment === "UPI/Card"}
                    onChange={(e) => setPayment(e.target.value)}
                    className="h-4 w-4 text-orange-500 border-gray-300 focus:ring-orange-400"
                    required
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    UPI / Card (Prepaid)
                  </span>
                </label>
              </div>
              <button
                type="submit"
                className="w-full mt-6 bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg"
              >
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
