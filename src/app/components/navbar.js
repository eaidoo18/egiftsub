 'use client'

import Image from "next/image"
import Link from "next/link"
import {User,ShoppingCart} from "lucide-react"
import { useState } from "react"


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
          <Link href="/login" className="text-blue-600 " onClick={() => setShowLogin(true)}>Login</Link>
          <ShoppingCart/>
          <Link href="/cart" >Cart</Link>

          {/* {modal} */}
          {showLogin &&  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
             <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative">
                 <button
                  onClick={() => setShowLogin(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                 >
                     ✕
                  </button>
                  <h2 className="text-2xl font-semibold mb-4">Login</h2>
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
              <input
                type="password"
                placeholder="Password"
                className="border rounded-lg p-2 w-full"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
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