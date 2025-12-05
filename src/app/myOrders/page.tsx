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

  return (
    <div className="p-4">
      <h1 className="text-center font-bold text-2xl pb-4">Order History</h1>
      {orders.length === 0 ? (
        <div className=" p-4 flex flex-col items-center border transition rounded">
          <p className="pb-6 text-6xl font-bold">No Orders yet</p>
          <Link
            href={"/shop"}
            className="border p-[5px] border-orange-400 hover:bg-orange-400 transition rounded text-sm"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="border p-2 ">
          {orders.map((order, index) => (
            <div
              key={order._id}
              className="border flex flex-col gap-2 pt-4 p-2"
            >
              <div className="flex w-full justify-between">
                <h1 className=" font-bold text-2xl">
                  <span>Order: </span>
                  {index + 1}
                </h1>
                <p>{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div className=" flex flex-col gap-3 ">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between p-4 ">
                    <div className="flex justify-between w-full border rounded-xl transition hover:shadow-2xl">
                      <div className="rounded-xl overflow-hidden border">
                        <img
                          src={item.image || "https://placehold.co/100"}
                          width={200}
                          height={200}
                        />
                      </div>
                      <div className="grow flex-col justify-baseline p-4">
                        <p>{item.name}</p>
                        <p>
                          <span>Quantity: </span>
                          {item.quantity}
                        </p>
                      </div>
                      <div className="p-4 w-1/9 flex justify-center">
                        <p className=" font-bold text-2xl">{item.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex w-full justify-between items-center p-4">
                <p className=" font-bold text-2xl">{order.status}</p>
                <div className="p-4 w-1/9 flex justify-center">
                  <p className=" font-bold text-2xl">{order.amount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
