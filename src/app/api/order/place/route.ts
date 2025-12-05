import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Order from "@/models/OrderModel";
import User from "@/models/UserModel";
import Product from "@/models/ProductModel";

await connectToDatabase();

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    const { userId, address, payment } = requestData;

    if (!userId || !address || !payment) {
      return NextResponse.json(
        { success: false, message: "Details Not Provided" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    const cartData = user.cartItems || {};

    if (Object.keys(cartData).length === 0) {
      return NextResponse.json(
        { success: false, message: "Cart is Empty" },
        { status: 400 }
      );
    }

    const productIds = Object.keys(cartData);
    const products = await Product.find({ _id: { $in: productIds } });

    let totalAmount = 0;
    const orderItems = [];

    for (const product of products) {
      const quantity = cartData[product._id.toString()];

      if (quantity > 0) {
        orderItems.push({
          name: product.name,
          price: product.price,
          quantity: quantity,
          image: product.imageUrl,
        });
      }

      totalAmount += product.price * quantity;
    }

    const newOrder = new Order({
      userId,
      items: orderItems,
      amount: totalAmount,
      address,
      payment,
      date: Date.now(),
    });

    await newOrder.save();

    await User.findByIdAndUpdate(userId, { cartItems: {} });

    return NextResponse.json(
      { success: true, message: "Order Placed Successfully!" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error placing order:", error); // Log the detailed error
    return NextResponse.json(
      { success: false, message: error.message || "Error in placing Order" },
      { status: 500 }
    );
  }
}
