import { db } from "@/lib/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, otp } = await req.json();

  const otpDoc = await getDoc(doc(db, "otps", email));
  if (!otpDoc.exists()) {
    return NextResponse.json({ success: false, message: "OTP not found" });
  }

  const data = otpDoc.data();

  if (data.expires < Date.now()) {
    await deleteDoc(doc(db, "otps", email));
    return NextResponse.json({ success: false, message: "OTP expired" });
  }

  if (data.otp !== otp) {
    return NextResponse.json({ success: false, message: "Invalid OTP" });
  }

  await deleteDoc(doc(db, "otps", email));

  // ✅ Here you should create a session or JWT for the user
  return NextResponse.json({ success: true, message: "Login successful" });
}
