"use client";
import axios from "axios";
import { PackageIcon, PlusIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface inventoryItems {
  _id: string;
  name: string;
  price: string;
  category: string;
  imageUrl: string[];
}

export default function SellerDashboard() {
  const [totalProduct, setTotalProduct] = useState("");
  const [products, setProducts] = useState<inventoryItems[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboardData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/product/list");
        if (response.data.success) {
          setTotalProduct(response.data.pagination.totalProducts);
          setProducts(response.data.products);
        }
      } catch (error) {
        console.log("Error in getting products: ", error);
      } finally {
        setLoading(false);
      }
    };

    getDashboardData();
  }, []);

  const handleDelete = async (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      // TODO: Implement API call to delete product
      console.log("Deleting product:", productId);
      setProducts(products.filter((p) => p._id !== productId));
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-[#F3F4F6]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-6">
            <div className="p-4 rounded-full bg-orange-100">
              <PackageIcon className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Total Products
              </p>
              {loading ? (
                <div className="mt-1 h-8 w-24 bg-gray-200 rounded-md animate-pulse" />
              ) : (
                <p className="text-3xl font-bold text-gray-800">
                  {totalProduct}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white p-6 rounded-2xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Inventory
            </h2>
            <Link
              href="/seller/add-product"
              className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Add Product</span>
            </Link>
          </div>

          {loading && products.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Loading products...</p>
          ) : !loading && products.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No products found. Add your first product!
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b bg-gray-50 text-sm font-medium text-gray-600">
                    <th className="p-4">Product</th>
                    <th className="p-4 hidden md:table-cell">Category</th>
                    <th className="p-4 hidden sm:table-cell">Price</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => (
                    <tr key={item._id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden shrink-0">
                            <img
                              src={
                                item.imageUrl[0] ||
                                "https://placehold.co/100"
                              }
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="font-semibold text-gray-800">
                            {item.name}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600 hidden md:table-cell">
                        {item.category}
                      </td>
                      <td className="p-4 font-medium text-gray-800 hidden sm:table-cell">
                        &#8377;{item.price}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100"
                          title="Delete"
                        >
                          <Trash2Icon className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
