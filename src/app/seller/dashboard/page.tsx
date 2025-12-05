"use client";
import axios from "axios";
import { PackageIcon, ListOrderedIcon, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function sellerDashboard() {
  const [totalProduct, setTotalprouduct] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("/api/product/list");

        if (response.data.success) {
          setTotalprouduct(response.data.pagination.totalProducts);
        }
      } catch (error) {
        console.log("Error in getting Products: ", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="overflow-scroll">
      <div className="border p-4 flex justify-center items-center flex-col">
        <h1 className="w-full text-center font-bold text-4xl p-4">
          Hello Seller!
        </h1>
        <div className=" w-full border p-2 rounded">
          <div className="flex justify-between  items-center  w-full rounded bg-linear-to-r from-red-500 to-orange-500 p-6 h-[200px]">
            <h1 className="p-5 text-5xl font-bold">Total Products</h1>
            {loading ? (
              <div>
                <p className="text-4xl font-bold p-4">Loading...</p>
              </div>
            ) : (
              <div className=" flex justify-center items-center ">
                <p  className="text-3xl font-bold p-4">{totalProduct}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
