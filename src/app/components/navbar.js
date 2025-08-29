'use client';

import Link from "next/link";
import { User, ShoppingCart } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import LoginModal from "@/components/loginModal";

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);

  const navItems = [
    { title: 'Support', link: '/support' },
    { title: 'FAQs', link: '/faqs' },
    { title: 'Policy', link: '/policy' },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Image src="/assets/logo.png" alt="Logo"  width={100} height={100} />
        </div>

        {/* Nav Items */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((navItem, index) => (
            <Link key={index} href={navItem.link} className="hover:text-blue-500">
              {navItem.title}
            </Link>
          ))}
        </div>

        <div className="flex space-x-4">
          <button
            className="text-blue-600 flex cursor-pointer"
            onClick={() => setShowLogin(true)}
          >
            <User className="mr-2" />
            Login
          </button>

          <Link href="/cart" className="flex">
            <ShoppingCart className="mr-2" />
            Cart
          </Link>
        </div>
      </div>

      <div className="bg-blue-900 py-2 flex gap-6 items-center justify-center">
        <p className="text-white font-bold">fast digital delivery</p>
        <p className="text-white font-bold">100% Legit codes</p>
      </div>

      {/* ✅ Render Login Modal */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)}/> }
    </nav>
  );
}
