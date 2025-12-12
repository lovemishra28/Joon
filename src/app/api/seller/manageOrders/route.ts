import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Order from "@/models/OrderModel";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const orders = await Order.find({}).sort({ date: -1 });

    return NextResponse.json({ success: true, orders });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: "Error" }, { status: 500 });
  }
}