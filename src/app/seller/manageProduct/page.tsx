"use client";
import axios from "axios";
import { PackageIcon, ListOrderedIcon, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface inventoryItems {
  _id: string;
  name: string;
  price: string;
  category: string;
  imageUrl: string[];
}

export default function manageProducts() {
  const [product, setProduct] = useState<inventoryItems[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("/api/product/list");
        if (response.data.success) {
          setProduct(response.data.products);
        }
      } catch (error) {
        console.log("Error in getting Products: ", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="font-bold text-2xl min-h-screen flex justify-center items-center">
        Loaing...
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex flex-col gap-4">
        <h1 className="w-full text-center font-bold text-3xl p-4">
          Your Products!
        </h1>
        <div className="  p-2 flex flex-col gap-2">
          <h1 className="p-2 font-bold text-4xl">Inventory</h1>
          <table className="border">
            <thead className=" flex flex-col  p-2 max-h-[500px] overflow-scroll">
              <tr className="gap-2 flex p-6  items-center">
                <th className="w-1/5 text-center ">Image</th>
                <th className="w-1/5 text-center ">Name</th>
                <th className="w-1/5 text-center ">Category</th>
                <th className="w-1/5 text-center ">Price</th>
                <th className="w-1/5 text-center ">Action</th>
              </tr>
              {product.map((item) => (
                <tr key={item._id} className="flex items-center gap-2 p-6 ">
                  <td className="w-1/5 text-center flex justify-center items-center ">
                    <div className="w-60 h-40 p-4 object-cover overflow-hidden">
                      <img
                        className="w-full h-full"
                        src={item.imageUrl[0] || "https://placehold.co/400x400"}
                        alt={item.name}
                      />
                    </div>
                  </td>
                  <td className="w-1/5 text-center ">{item.name}</td>
                  <td className="w-1/5 text-center ">{item.category}</td>
                  <td className="w-1/5 text-center ">{item.price}</td>
                  <td className="w-1/5 text-center ">
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </thead>
          </table>
          <div className="p-2 w-full border bg-black text-white rounded flex justify-center items-center">
            <button className="p-2 font-bold text-4xl hover:bg-gray-700 transition-all rounded">
              <Link href={"/seller/add-product"}>Add Product</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
