"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";

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
      alert("Please Login first");
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
        alert("Order placed successfully!");
        router.push("/myOrders");
      } else {
        alert("Failed: " + response.data.message);
      }
    } catch (error) {
      alert("Unable to process order");
      console.log("Error in placing order :", error);
    }
  };

  return (
    <div className="border flex flex-col justify-center items-center p-4">
      <h1 className="pb-4 text-3xl font-bold">Delivery Information</h1>
      <form
        onSubmit={handlePlaceOrder}
        className="border flex gap-2 p-4 w-full"
      >
        <div className="flex flex-col border p-2 left gap-4 w-7/10">
          <div className="flex w-full gap-2">
            <input
              type="text"
              placeholder="Fist-Name"
              className="text-center outline-none border border-gray-500 p-2 grow"
              value={address.firstName}
              onChange={(e) => {
                setAddress({ ...address, firstName: e.target.value });
              }}
            />
            <input
              type="text"
              placeholder="Last-Name"
              className="text-center outline-none border border-gray-500 p-2 grow"
              value={address.lastName}
              onChange={(e) => {
                setAddress({ ...address, lastName: e.target.value });
              }}
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Email"
              className="text-center outline-none border border-gray-500 p-2 w-full "
              value={address.email}
              onChange={(e) => {
                setAddress({ ...address, email: e.target.value });
              }}
            />
          </div>
          <div className="border p-4 ">
            <h6 className="pb-4">Address</h6>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 w-full">
                <input
                  type="text"
                  placeholder="Street"
                  className="text-center outline-none grow border border-gray-500 p-2 "
                  value={address.street}
                  onChange={(e) => {
                    setAddress({ ...address, street: e.target.value });
                  }}
                />
                <input
                  type="text"
                  placeholder="City"
                  className="text-center outline-none grow border border-gray-500 p-2  "
                  value={address.city}
                  onChange={(e) => {
                    setAddress({ ...address, city: e.target.value });
                  }}
                />
              </div>
              <div className=" w-full flex flex-col gap-2 ">
                <input
                  type="text"
                  placeholder="Pincode"
                  className="text-center outline-none border border-gray-500 p-2 w-full "
                  value={address.zipcode}
                  onChange={(e) => {
                    setAddress({ ...address, zipcode: e.target.value });
                  }}
                />
                <input
                  type="text"
                  placeholder="State"
                  className="text-center outline-none border border-gray-500 p-2 w-full h-[100px]"
                  value={address.state}
                  onChange={(e) => {
                    setAddress({ ...address, state: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex right border justify-center p-2 grow">
          <div className="border flex flex-col grow justify-between items-center p-2">
            <div className="w-full">
              <h1 className="pb-4 text-2xl font-semibold">Payment Details</h1>
              <div className="flex flex-col ">
                <label className="border p-2 w-full">
                  <input
                    type="radio"
                    name="payment"
                    value={"UPI/Card"}
                    checked={payment === "UPI/Card"}
                    onChange={(e) => {
                      setPayment(e.target.value);
                    }}
                  />
                  UPI/Card
                </label>
                <label className="border p-2 w-full">
                  <input
                    type="radio"
                    name="payment"
                    value={"COD"}
                    checked={payment === "COD"}
                    onChange={(e) => {
                      setPayment(e.target.value);
                    }}
                  />
                  Cash on Delivery
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="block w-full cursor-pointer bg-black text-white text-center py-3 rounded-md font-semibold hover:bg-gray-800 transition"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
