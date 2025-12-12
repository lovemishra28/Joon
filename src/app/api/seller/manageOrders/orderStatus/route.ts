import connectToDatabase from "@/lib/db";
import Order from "@/models/OrderModel";
import { NextRequest, NextResponse } from "next/server";

await connectToDatabase();

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    const { orderId, newStatus } = requestData;

    if (!orderId || !newStatus) {
      return NextResponse.json(
        { success: false, message: "Order ID and new status must be provided" },
        { status: 400 }
      );
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }
    order.status = newStatus;
    await order.save();

    return NextResponse.json(
      { success: true, message: "Order status updated successfully", order },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
