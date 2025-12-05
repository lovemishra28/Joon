import connectToDatabase from "@/lib/db";
import Product from "@/models/ProductModel";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

await connectToDatabase();

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    const { userId, itemId } = requestData;

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const cartItems = user.cartItems;
    if (cartItems[itemId]) {
      cartItems[itemId] += 1;
    } else {
      cartItems[itemId] = 1;
    }

    await User.findByIdAndUpdate(userId, { cartItems });

    return NextResponse.json(
      { success: true, message: "Added to Cart successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error adding to cart" },
      { status: 500 }
    );
  }
}
