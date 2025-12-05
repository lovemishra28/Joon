import Product from "@/models/ProductModel";
import User from "@/models/UserModel";
import connectToDatabase from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

await connectToDatabase();

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    const { userId } = requestData;

    const user = await User.findById(userId);
    const cartData = user.cartItems;

    const productId = Object.keys(cartData);

    const products = await Product.find({ _id: { $in: productId } });

    const cartProducts = products.map((product) => {
      return {
        ...product.toObject(),
        quantity: cartData[product._id.toString()],
      };
    });

    return NextResponse.json({ success: true, cartProducts });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error getting to Cart",
      },
      { status: 500 }
    );
  }
}
