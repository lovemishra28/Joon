import connectToDatabase from "@/lib/db";
import Product from "@/models/ProductModel";
import { NextRequest, NextResponse } from "next/server";

await connectToDatabase();

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();

    const { name, description, price, offerPrice, category, image } =
      requestData;

    if (!name || !description || !price || !category || !image || image.length === 0) {
      return NextResponse.json(
        { success: false, message: "Product Details not provided or image is missing" },
        { status: 400 }
      );
    }

    const product = new Product({
      name,
      description,
      price: Number(price),
      offerPrice: Number(price),
      category,
      imageUrl: image,
    });

    await product.save();

    return NextResponse.json(
      { success: true, message: "Product added successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { success: false, message: "Error in adding Product" },
      { status: 500 }
    );
  }
}
