import { sendMail } from "@/services/Mail";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const tableData = await req.json();
    console.log(tableData);
    await sendMail(
      "Sent the Selected Row Data",
      "info@redpositive.in",
      `   Name:${tableData.Name},
          Phone-Number:${tableData.phoneNumber},
          Email:${tableData.Email},
          Hobbies:${tableData.Hobbies}
          `
    );
    return NextResponse.json({
      success: true,
      message: "Mail Sent Successfull",
    });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ success: false, message: "Error" });
  }
}
