import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Order from "@/models/OrderModel";

await connectToDatabase();

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();
    const orders = await Order.find({ userId }).sort({ date: -1 });

    return NextResponse.json({ success: true, orders });
  } catch (error:any) {
    console.log(error)
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
