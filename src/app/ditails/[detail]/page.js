// app/ditails/[detail]/page.js

export const dynamic = "force-dynamic"; // ✅ Allow dynamic rendering at runtime

import Navbar from "../../Componentes/Navbar/Navbar";
import Fromright from "../../Componentes/Formright/Formright";
import LightboxClient from "./LightboxClient";
import Link from "next/link";

export default async function DetailPage({ params }) {
  const  {detail}  = await params;
  let album = null;
 
  const res = await fetch(`http://skgpsd.com/skgpsdbe/public/api/web/album/${detail}`, {
      cache: "no-store", // Always fetch fresh data
    });

  if (res.ok) {
      const data = await res.json();
      album = data?.data?.album;  
    }

  if (!album) {
    return (
      <div className="p-10 text-red-500 text-center text-xl">
        Album not found
      </div>
    );
  }

  let galleryImages = [];
  try {
    galleryImages = JSON.parse(album.galleries);
  } catch (e) {
    console.error("Failed to parse gallery images", e);
  }
  const phoneNumber = "919876543210"; // replace with your number (include country code, no + sign)
  const messageText = "Hi, I want to book a service via your website.";
  
  const whatsappMessage = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageText)}`;
  
  return (
    <>
      <Navbar />

      <div className="p-6 flex flex-col lg:flex-row gap-8 min-h-screen">
        {/* Left: Gallery Section */}
        <div className="lg:w-2/3 w-full">
         <div className="flex flex-row justify-between">
         <h1 className="text-3xl font-bold mb-6">{album.name}</h1>
         <a
              href={whatsappMessage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm border border-black text-white bg-black py-1.5 px-3 h-[2rem] rounded hover:bg-gray-700 transition"
            >
              add to cart
            </a>
         </div>
          <LightboxClient galleryImages={galleryImages} />
        </div>

        {/* Right: Inquiry Form */}
        <div className="lg:w-1/3 w-full">
          <div className="sticky top-24 bg-white p-6 rounded shadow-md border">
            <Fromright albumId={album.id}/>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-4 text-center text-sm flex flex-row justify-around">
        <p>
          <span className="text-gray-300">Copyright © 2022</span>{" "}
          <span className="font-semibold text-yellow-400">SKG PSD.</span>{" "}
          <span className="font-bold">All Right Reserved.</span>
        </p>
        <p>
            <Link href="/privacyPolicyPage"
            >   PrivacyPolicyPage</Link>
     
        </p>
      </footer>
    </>
  );
}
