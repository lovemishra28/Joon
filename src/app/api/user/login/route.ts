import connectToDatabase from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/UserModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const requestData = await request.json();

    const { email, password } = requestData;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Error Details no Provided" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: "User not found " },
        { status: 404 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { success: false, message: "Error Wrong Password" },
        { status: 400 }
      );
    }

    const tokenData = {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "7d",
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successfull!",
        user: { name: existingUser.name, id: existingUser._id },
      },
      { status: 201 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error in Loggin user try again",
      },
      { status: 500 }
    );
  }
}
