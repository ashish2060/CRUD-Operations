import userModel from "@/utils/model/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function DELETE(request, content) {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const userId = content.params.id;

    const updateUser = await userModel.findOneAndDelete({ _id: userId });

    return NextResponse.json({
      success: true,
      message: "User Deleted successfull",
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ success: false, message: "Error" });
  }
}
