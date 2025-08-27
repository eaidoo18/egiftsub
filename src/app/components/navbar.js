 'use client'


import Link from "next/link"
import {User,ShoppingCart, BugIcon} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button";
import Image from "next/image";


export default function Navbar(){


    const[showLogin, setShowLogin] = useState(false);


      const navItems =[
         {title: 'Support',link:'/support'},
         { title: 'FAQs',link:'/faqs'},
         {title: 'Policy', link:'/policy'},
         
      ]

    return(
          
           <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/assets/logo.png" alt="Logo" className="h-28 w-36" />
          
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
            <User/>
          <button href="/login" className="text-blue-600 " onClick={() => setShowLogin(true)}>Login</button>
          <ShoppingCart/>
          <Link href="/cart" >Cart</Link>

          {/* {modal} */}
          {showLogin &&  <div className="fixed inset-0 bg-black opacity-80 flex justify-center items-center z-50">
             <div className="bg-white opacity-100 rounded-xl shadow-lg w-96 p-6 relative">
                 <button
                  onClick={() => setShowLogin(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                 >
                     ✕
                  </button>
                  <h2 className="text-2xl font-semibold mb-4">Welcome Back</h2>
                  <p className="mb-2">Sign in or create an account</p>
            <form  onSubmit={(e)=>{
                        e.preventDefault();
                        alert('form submitted')
            }} 
             className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="border rounded-lg p-2 w-full"
              />
             
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
              >
                Send OTP
              </button>
             <div className="relative flex py-3 items-center">
               <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-3 text-gray-500">or</span>
               <div className="flex-grow border-t border-gray-400"></div>
             </div>
                <Button>
                   <Image src='/assets/passkey.png' width={20} height={20} alt="passkey logo"/>
                   Login with password
                </Button>
                <Button>
                  <Image src='/assets/google.png' width={20} height={20} alt="google logo"/>
                  Login with Google
                </Button>

              <div className="flex">
                <p>Don't have an account? </p>
                <Link href='/createaccount' className="font-bold">Create Account</Link>
              </div>
              
            </form>
             </div>
            </div>
            }          
        </div>

      </div>


      
      <div className="bg-blue-900 py-2 flex gap-6 items-center justify-center">
        <p className="text-white font-bold">fast digital delivery</p>
        <p className="text-white font-bold">100% Legit codes</p>

      </div>
    </nav>
        
    )

}