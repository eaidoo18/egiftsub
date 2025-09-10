'use client';

import Link from "next/link";
import { User, ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import LoginModal from "@/components/loginModal";

export default function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("login");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <Image src="/assets/logo.png" alt="Logo" width={100} height={100} />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((navItem, index) => (
            <Link key={index} href={navItem.link} className="hover:text-blue-500">
              {navItem.title}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex space-x-4">
          <button
            className="text-blue-600 flex cursor-pointer"
            onClick={() => {
              setShowModal(true);
              setModalType("login");
            }}
          >
            <User className="mr-2" />
            Login
          </button>

          <Link href="/cart" className="flex">
            <ShoppingCart className="mr-2" />
            Cart
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-3 space-y-4">
          {navItems.map((navItem, index) => (
            <Link
              key={index}
              href={navItem.link}
              className="block hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              {navItem.title}
            </Link>
          ))}

          <button
            className="text-blue-600 flex items-center"
            onClick={() => {
              setShowModal(true);
              setModalType("login");
              setIsMenuOpen(false);
            }}
          >
            <User className="mr-2" />
            Login
          </button>

          <Link
            href="/cart"
            className="flex items-center"
            onClick={() => setIsMenuOpen(false)}
          >
            <ShoppingCart className="mr-2" />
            Cart
          </Link>
        </div>
      )}

      {/* Banner */}
      <div className="bg-blue-900 py-2 flex flex-col md:flex-row gap-2 md:gap-6 items-center justify-center text-center">
        <p className="text-white font-bold text-sm md:text-base">fast digital delivery</p>
        <p className="text-white font-bold text-sm md:text-base">100% Legit codes</p>
      </div>

      {/* Login Modal */}
      {showModal && (
        <LoginModal
          type={modalType}
          onClose={() => setShowModal(false)}
          onSwitch={(type) => setModalType(type)}
        />
      )}
    </nav>
  );
}
