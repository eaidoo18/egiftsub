import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { fullName, email, password } = await req.json();

    if (!fullName || !email || !password) {
      return NextResponse.json({ success: false, message: "All fields are required" });
    }

    // ✅ Check if user already exists
    const userQuery = query(collection(db, "users"), where("email", "==", email));
    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      return NextResponse.json({ success: false, message: "User already exists" });
    }

    // ✅ Create user in Firestore
    await addDoc(collection(db, "users"), {
      fullName,
      email,
      password, // ❗ Ideally hash password before saving
      createdAt: Date.now(),
    });

    return NextResponse.json({ success: true, message: "Account created successfully" });
  } catch (error) {
    console.error("Error in create-account:", error);
    return NextResponse.json({ success: false, message: "Something went wrong" });
  }
}
