import { TrendingUp } from "lucide-react";
import LogoBar from "./Logobar";

export default function Hero() {
  const trenditems = [
    { name: "Apple Music", link: "/apple" },
    { name: "Netflix", link: "/netflix" },
    { name: "Hulu", link: "/hulupage" },
    { name: "Playstation", link: "/playstation" },
  ];

  return (
    <>
      <div className="bg-blue-200 p-6 md:p-20 text-center md:text-left">
        {/* Headings */}
        <h1 className="font-bold text-2xl md:text-4xl p-2">
          Buy Digital Giftcodes in Ghana
        </h1>
        <h2 className="text-lg md:text-2xl p-2">
          Shop Apple Music, PlayStation, & More
        </h2>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-2 mt-4">
          <input
            type="text"
            placeholder="Search Gift code"
            className="rounded-2xl py-2 pl-2 w-full md:w-80 bg-white outline-none"
          />
          <button className="w-full md:w-auto cursor-pointer rounded-2xl bg-amber-300 py-2 px-4 hover:bg-amber-400">
            Search
          </button>
        </div>

        {/* Trending */}
        <span className="text-gray-700 flex items-center justify-center md:justify-start pt-4">
          <TrendingUp width={16} className="mr-1" />
          Trending searches
        </span>

        {/* Trend Buttons */}
        <div className="flex flex-wrap justify-center md:justify-start mt-2">
          {trenditems.map((item, index) => (
            <button
              key={index}
              className="rounded-3xl py-1 px-3 m-1 cursor-pointer bg-gray-500 text-white hover:bg-gray-400"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Logo Bar below */}
      <LogoBar />
    </>
  );
}
