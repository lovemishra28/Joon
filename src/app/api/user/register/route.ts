import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/UserModel";
import bcrypt from "bcryptjs";

await connectToDatabase();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();

    const { email, name, password } = requestBody;

    if (!email || !name || !password) {
      return NextResponse.json(
        { success: false, message: "Error details not provided" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Error User already exists with this email",
        },
        { status: 400 }
      );
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      cartItems: {},
    });

    await newUser.save();

    return NextResponse.json(
      {
        success: true,
        message: "User registerd successfully!",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Error regestering user" },
      { status: 500 }
    );
  }
}
