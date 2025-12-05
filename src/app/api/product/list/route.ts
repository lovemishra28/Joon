import connectToDatabase from "@/lib/db";
import Product from "@/models/ProductModel";
import { NextRequest, NextResponse } from "next/server";

await connectToDatabase();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const category = searchParams.get("category") || "All";

    let filter = {};

    if (category !== "All") {
      filter = { category: category };
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(filter).skip(skip).limit(limit);

    const totalProducts = await Product.countDocuments(filter);

    return NextResponse.json({
      success: true,
      products,
      pagination: {
        totalProducts,
        currentPage: page,
        totlaPages: Math.ceil(totalProducts / limit),
        limit,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error in gettin list" },
      { status: 500 }
    );
  }
}
