"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface orderItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  _id: string;
  date: number;
  amount: number;
  status: string;
  items: orderItem[];
  address: any;
}

export default function getMyorders() {
  const router = useRouter();
  const [orders, setOrder] = useState<Order[]>([]);

  useEffect(() => {
    const orderHistory = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Please Login");
        router.push("/login");
        return;
      }
      try {
        const response = await axios.post("/api/order/user", { userId });
        if (response.data.success) {
          setOrder(response.data.orders);
        }
      } catch (error) {
        console.error("Error fetching order history:", error);
        alert("Failed to fetch order history.");
      }
    };

    orderHistory();
  }, []);

  const getStatusClasses = (status: string) => {
    switch (status.toLowerCase()) {
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-[#F3F4F6] min-h-[calc(100vh-100px)] w-full p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Order History
        </h1>
        {orders.length === 0 ? (
          <div className="text-center bg-white p-12 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              You have no orders yet.
            </h2>
            <p className="text-gray-500 mb-8">
              All your future orders will appear here.
            </p>
            <Link
              href={"/shop"}
              className="inline-block px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg"
              >
                {/* Order Header */}
                <div className="p-4 sm:p-6 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div className="mb-4 sm:mb-0">
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-mono text-sm text-gray-800">
                      #{order._id.slice(-10)}
                    </p>
                  </div>
                  <div className="mb-4 sm:mb-0 sm:text-center">
                    <p className="text-sm text-gray-500">Date Placed</p>
                    <p className="font-medium text-gray-800">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-bold text-lg text-gray-900">
                      &#8377;{order.amount.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4 sm:p-6">
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex gap-4 items-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                          <img
                            src={item.image || "https://placehold.co/100"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="grow">
                          <p className="font-semibold text-gray-800">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-800">
                            &#8377;{item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Footer */}
                <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusClasses(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <Link
                    href="#"
                    className="text-sm font-medium text-orange-500 hover:text-orange-600"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
