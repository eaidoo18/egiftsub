import Image from "next/image";
import Navbar from "./components/navbar";
import Hero from "./components/hero";



export default function Home() {

  const products = [
    {
    "id": 1,
    "name": "Apple Music",
    "price": 99.99,
    "rating": 4.5,
    "button" : "Shop Now"
  },
  {
    "id": 2,
    "name": "Hulu",
    "price": 59.99,
    "rating": 6.0,
     "button" : "Shop Now"
  },
  {
    "id": 3,
    "name": "Playstation",
    "price": 89.99,
    "rating": 5.0,
    "button" : "Shop Now"

  },
  {
    "id": 4,
    "name": "Spotify",
    "price": 75.99,
    "rating": 4.65,
    "button" : "Shop Now"
  },
  {
    "id": 5,
    "name": "Hulu",
    "price": 59.99,
    "rating": 6.0,
    "button" : "Shop Now"
  },
  {
    "id": 6,
    "name": "Disney+",
    "price": 39.99,
    "rating": 5.1,
    "button" : "Shop Now"
  }
]



  return (
    <div>
     <Navbar/>
     <Hero/>
       <div>
        <section className="max-w-7xl mx-auto p-6">
           <h1 className="text-3xl font-semibold mb-6 ">Top Sellers</h1>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map( product => (
              <article key={product.id} className="bg-white rounded-2xl shadow-sm overflow-hidden transform transition duration-200 hover:scale-[1.02] focus:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-indigo-100">
                
              
               {/* <Image src ={} alt="logo" className="w-full h-40 object-cover"/> */}
            <div className="p-4">
              <h3 id={product.id} className="text-lg font-medium">{product.name}</h3>
              <p className="mt-1 text-sm text-gray-600">₵{product.price}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-500">⭐ {product.rating}</div>
                <div className="flex gap-2">
                 
                  <button className="px-3 py-1 rounded-md bg-amber-500 font-bold text-black text-sm hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-indigo-300">Buy</button>
                </div>
              </div>
            </div>
              </article>

            ))}
           </div>
        </section>
       
        
    
     
       
        <button className="bg-blue-500 rounded-md px-8 py-2 font-bold shadow-2xl cursor-pointer text-white hover:bg-blue-600">Shop All </button>
       </div>
      
    </div>
    
  );
}
