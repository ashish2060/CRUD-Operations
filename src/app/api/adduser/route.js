import userModel from "@/utils/model/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const userData = await request.json();
    console.log(userData);

    if (!userData.name || !userData.phoneNumber || !userData.email) {
      return NextResponse.json({
        success: false,
        message: "Please fill all data",
      });
    }
    const newUser = new userModel({
      Name: userData.name,
      phoneNumber: userData.phoneNumber,
      Email: userData.email,
      Hobbies: userData.hobbies,
    });

    await newUser.save();

    return NextResponse.json({
      success: true,
      message: "User added successfull",
    });
  } catch (error) {
    NextResponse.json({ success: false, message: "Error" });
    console.log(error.message);
  }
}
