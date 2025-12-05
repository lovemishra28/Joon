import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/ProductModel";
import connectToDatabase from "@/lib/db";

await connectToDatabase();

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();

    const { productId } = requestData;

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { success: false, message: "No Product found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error in Finding Product" },
      { status: 500 }
    );
  }
}
