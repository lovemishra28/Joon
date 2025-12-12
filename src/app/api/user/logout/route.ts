import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    cookieStore.set("token", "", {
      httpOnly: true, 
      expires: new Date(0) 
    });

    return NextResponse.json({
      message: "Logout successful",
      success: true,
    });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}