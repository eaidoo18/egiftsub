import { db } from "@/lib/firebase";
import { collection ,query,getDocs, where,doc,setDoc } from "firebase/firestore";
import nodemailer from "nodemailer"
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email } = await req.json();

  // Check if user exists in Firestore
  const q = query(collection(db, "users"), where("email", "==", email));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return NextResponse.json({ success: false, message: "Account not found" });
  }

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = Date.now() + 5 * 60 * 1000; // 5 mins

  // Save OTP in Firestore
  await setDoc(doc(db, "otps", email), { otp, expires });

  // Send email
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Login OTP",
    text: `Your OTP is ${otp}. It expires in 5 minutes.`,
  });

  return NextResponse.json({ success: true });
}