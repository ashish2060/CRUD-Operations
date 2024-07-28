export const dynamic = "force-dynamic";
import userModel from "@/utils/model/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const allUser = await userModel.find({});
    return NextResponse.json({ success: true, allUser });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ success: false, message: "Error" });
  }
}
