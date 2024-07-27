import userModel from "@/utils/model/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request, content) {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const userData = await request.json();
    const userId = content.params.id;
    console.log(userId);

    const updateUser = await userModel.findOneAndUpdate(
      { _id: userId },
      {
        Name: userData.name,
        phoneNumber: userData.phoneNumber,
        Email: userData.email,
        Hobbies: userData.hobbies,
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "User Updated successfull",
      updateUser,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ success: false, message: "Error" });
  }
}
