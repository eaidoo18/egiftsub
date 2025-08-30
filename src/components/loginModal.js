'use client';
import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

export default function LoginModal({ type, onClose, onSwitch }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const isLogin = type === "login";

  // ✅ Request OTP (Login flow)
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
      setError("");
    } else {
      setError(data.message);
    }
  };

  // ✅ Verify OTP (Login flow)
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

  // ✅ Create Account (Sign-up flow)
  const handleSignup = async (e) => {
    e.preventDefault();

    // Create account logic (call your backend to create the user)
    const res = await fetch("/api/create-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullname, email, password }),
    });
    const data = await res.json();

    if (data.success) {
      // After account creation, send OTP
      const otpRes = await fetch("/api/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const otpData = await otpRes.json();
      if (otpData.success) {
        setStep(2); // Move to "Please check your email" screen
        setError("");
      } else {
        setError("Error sending OTP. Please try again.");
      }
    } else {
      setError(data.message);
    }
  };

  // ✅ Verify OTP for Signup
  const verifySignupOtp = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    if (data.success) {
      alert("Account created successfully!");
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

        {isLogin ? (
          <>
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

            {/* Divider */}
            <div className="relative flex py-3 items-center">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="flex-shrink mx-3 text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>

            {/* Other login options */}
            <button className="flex border-2 px-4 py-2 items-center justify-center gap-2 mb-2 cursor-pointer w-full rounded-lg">
              <Image src="/assets/passkey.png" width={20} height={20} alt="passkey logo" />
              <span>Login with password</span>
            </button>
            <button className="flex border-2 items-center justify-center gap-2 cursor-pointer w-full px-4 py-2 rounded-lg">
              <Image src="/assets/google.png" width={20} height={20} alt="google logo" />
              <span>Login with Google</span>
            </button>

            {/* Switch to Signup */}
            <div className="flex mt-4 ">
              <p>Don't have an account?</p>
              <button
                onClick={() => {
                  setStep(1);
                  onSwitch("signup");
                }}
                className="font-bold ml-1 text-black cursor-pointer"
              >
                Create Account
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              {step === 1 ? "Create Account" : step === 2 ? "Check Your Email" : "Verify OTP"}
            </h2>

            {/* Step 1: Signup Form */}
            {step === 1 && (
              <form onSubmit={handleSignup} className="flex flex-col space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border rounded-lg p-2 w-full"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="border rounded-lg p-2 w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="border rounded-lg p-2 w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
                >
                  Create Account
                </button>
              </form>
            )}

            {/* Step 2: Show "Please check your email" */}
            {step === 2 && (
              <div className="text-center space-y-4">
                <p className="text-gray-700">
                  We’ve sent an OTP to <strong>{email}</strong>. Please check your inbox.
                </p>
                <button
                  onClick={() => setStep(3)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer"
                >
                  Enter OTP
                </button>
              </div>
            )}

            {/* Step 3: Enter OTP */}
            {step === 3 && (
              <form onSubmit={verifySignupOtp} className="flex flex-col space-y-4">
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

            {/* Back to Login */}
            {step === 1 && (
              <button
                onClick={() => {
                  setStep(1);
                  onSwitch("login");
                }}
                className="text-gray-700 font-semibold mt-4 block "
              >
                ← Back to Login
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
