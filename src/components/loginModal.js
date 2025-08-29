'use client';
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function LoginModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  // ✅ Request OTP
  const requestOtp = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/request-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (data.success) {
      setStep(2);
    } else {
      setError(data.message);
    }
  };

  // ✅ Verify OTP
  const verifyOtp = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    if (data.success) {
      alert("Login successful!");
      onClose();
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <X width={25} height={25} />
        </button>

        <h2 className="text-2xl font-semibold mb-4">Welcome Back</h2>
        <p className="mb-2">Sign in or create an account</p>

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <form onSubmit={requestOtp} className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="border rounded-lg p-2 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
            >
              Send OTP
            </button>
          </form>
        )}

        {/* Step 2: Enter OTP */}
        {step === 2 && (
          <form onSubmit={verifyOtp} className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              className="border rounded-lg p-2 w-full"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer"
            >
              Verify OTP
            </button>
          </form>
        )}

        {error && <p className="text-red-500 mt-2">{error}</p>}

        {/* Social Login */}
        <div className="relative flex py-3 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-3 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        <Button>
          <Image src="/assets/passkey.png" width={20} height={20} alt="passkey logo" />
          Login with password
        </Button>
        <Button>
          <Image src="/assets/google.png" width={20} height={20} alt="google logo" />
          Login with Google
        </Button>

        <div className="flex mt-4">
          <p>Don't have an account? </p>
          <Link href="/createaccount" className="font-bold ml-1">Create Account</Link>
        </div>
      </div>
    </div>
  );
}
