
import {TrendingUp} from 'lucide-react'
import LogoBar from './Logobar'

export default function Hero(){

    const trenditems = [
      {name: 'Apple Music' ,link:'/apple' },
      {name: 'Netflix', link: '/netflix'},
      {name: 'Hulu' ,link: '/hulupage' },
      {name: 'Playstation',link: '/playstation'}

    ]

    return(<>
    <div className="bg-blue-200  p-20">
        <h1 className="font-bold  text-4xl p-2">Buy Digital Giftcodes in Ghana</h1>
        <h2 className="text-2xl p-2">Shop Apple music ,PlayStation,& More</h2>
    <div className="flex items-center">
  <input
    type="text"
    placeholder="Search Gift code"
    className="rounded-2xl py-2 mt-2  pl-2 w-80 bg-white outline-none"
  />
  <button className="ml-2    cursor-pointer rounded-2xl bg-amber-300 py-2 px-4 hover:bg-amber-400">
    Search
  </button>
  
</div>
    <span className="text-gray-700 flex pt-2">
     <TrendingUp width={16}   />
     Trending searches
    </span>

    {/* trend buttons */} 
    
      {trenditems.map(( item,index)=>(
          <button key={index} className='rounded-3xl py-1 px-2 mx-1 cursor-pointer mt-2 bg-gray-500 text-white hover:bg-gray-400'>
          {item.name}
          </button>
      ))}

   
    </div>
     <LogoBar/>
    </>
    )
}