import { Button } from "@/components/ui/button";
import { ProductStruct } from "../types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: ProductStruct;
}

const ProductItem = ({ product }: Props) => {
  return (
    <Link
      href={`/ProductDetail/${product._id}`}
      className="block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
    >
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={product.imageUrl[0] || "https://placehold.co/400x400"}
          alt={product.name}
          fill
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          unoptimized
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 truncate">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1 truncate">
          {product.description}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span className="font-bold text-xl md:text-2xl text-orange-500">
            &#8377;{product.price}
          </span>
          <div className="text-xs font-semibold text-white bg-orange-500 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
