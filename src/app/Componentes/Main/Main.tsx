'use client';
import Image from "next/image";
import { useEffect, useState } from "react";

export default function WeddingOffer() {
  const images = [
    "/Images/5.jpg",
    "/Images/6.jpg",
    "/Images/4.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);
  const phoneNumber = "919990144668"; // replace with your number (include country code, no + sign)
  const messageText = "Hi, I want to book a service via your website.";
  
  const whatsappMessage = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageText)}`;
  
  return (
    <section
      className="relative text-white bg-cover bg-center bg-no-repeat transition-all duration-1000"
      style={{
        backgroundImage: `url(${images[currentIndex]})`
      }}
    >
      <div className="bg-black/50">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div>
            <p className="text-yellow-400 text-1xl font-medium mb-2">
              LIMITED TIME OFFER
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold leading-tight text-white mb-3">
              Royal Wedding <br />
              Album PSD - <span className="text-yellow-400">₹1</span>
            </h2>
            <p className="text-gray-300 mb-6">
              Get a beautifully designed Wedding Album PSD file for just ₹1!
            </p>
            <a
              href={whatsappMessage}
              className="inline-block bg-yellow-400 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-300 transition"
            >
              BOOK NOW
            </a>
          </div>

          {/* Right Image */}
          <div className="relative w-full h-[400px] sm:h-[500px]">
            <div className="relative w-full h-full border-2 border-white   overflow-hidden">
              <Image
                src="/Images/banner-psd.jpg"
                alt="Wedding Couple"
                fill
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
