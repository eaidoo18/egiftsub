
"use client";
import { motion } from "framer-motion";

export default function LogoBar() {
  const logos = [
    "/assets/spotify.png",
    "/assets/applemusic.png",
    "/assets/hulu.png",
    "/assets/netflix.png",
    "/assets/xbox.png",
    "/assets/steam.png",
    "/assets/GooglePlay.png",
    "/assets/playstation.png"

    
  ];

const scrollingLogos = [...logos, ...logos];

  return (
    <div className="overflow-hidden  bg-gray-50 py-6 px-20">
      <motion.div
        className="flex"
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
      >
        {scrollingLogos.map((logo, i) => (
          <div key={i} className="flex-shrink-0 px-8">
            <img
              src={logo}
              alt="brand logo"
              className="h-12 w-auto object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
