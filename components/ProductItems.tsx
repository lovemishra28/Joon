import { ProductStruct } from "../types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: ProductStruct;
}

const ProductItem = ({ product }: Props) => {
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center w-full overflow-hidden border p-2 gap-2">
        <Image
          src={product.imageUrl[0] || "https://placehold.co/400x400"}
          alt={product.name}
          width={200}
          height={200}
          className="w-8/10 aspect-square object-cover  rounded-md"
          unoptimized
        />
        <div className=" flex flex-col w-8/10 items-baseline">
          <div>
            <h3 className="font-bold text-lg ">{product.name}</h3>
            <p className="w-9/10 whitespace-nowrap overflow-hidden text-ellipsis ">{product.description}</p>
          </div>
          <div className="flex justify-between items-center w-full">
            <span>{product.price}</span>
            <button>
              <Link href={`/ProductDetail/${product._id}`}>Details</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
