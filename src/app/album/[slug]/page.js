"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../Componentes/Navbar/Navbar"; // existing Navbar

export default function AlbumDetailPage() {
  const { slug } = useParams();
  const [albums, setAlbums] = useState([]);

  // ✅ Fetch albums by category slug
  useEffect(() => {
    if (!slug) return;

    const fetchAlbums = async () => {
      try {
        const res = await fetch(
          `https://skgpsd.com/skgpsdbe/public/api/web/category/${slug}`
        );
        const json = await res.json();
        setAlbums(json?.data?.albums || []);
      } catch (err) {
        console.error("Failed to fetch album data", err);
      }
    };

    fetchAlbums();
  }, [slug]);

  // ✅ Add to Cart with live Navbar update
  const handleAddToCart = (album) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const alreadyInCart = existingCart.find((item) => item.id === album.id);

    const product = {
      id: album.id,
      name: album.name,
      image: album.image,
      price: album.price || 99, // 💰 demo price
      url_key: album.download_url,
    };

    if (!alreadyInCart) {
      existingCart.push(product);
      localStorage.setItem("cart", JSON.stringify(existingCart));

      // 🔔 Notify Navbar to update cart count instantly
      window.dispatchEvent(new Event("cartUpdated"));

      alert(`${album.name} added to cart 🛒`);
    } else {
      alert(`${album.name} is already in cart!`);
    }
  };

  if (!albums || albums.length === 0) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold uppercase">{slug}</h1>
          <div className="p-10 text-center text-xl">Album not found</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold uppercase">{slug}</h1>
        </div>

        {/* Albums Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {albums.map((album) => {
            const demoPrice = album.price || Math.floor(Math.random() * 200) + 99; // 💵 Random demo price

            return (
              <div
                key={album.url_key}
                className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
              >
                <Image
                  src={`https://skgpsd.com/skgpsdbe/public/${album.image}`}
                  alt={album.name}
                  width={800}
                  height={500}
                  className="w-full object-cover"
                />

                <div className="px-6 py-4">
                  <h2 className="text-xl font-semibold mb-2">{album.name}</h2>
                  <p className="text-gray-700 text-base pb-2">
                    {album.meta_description}
                  </p>

                  {/* 💰 Demo Price */}
                  <p className="text-lg font-bold text-green-600 mb-3">
                    ₹{demoPrice}
                  </p>

                  <div className="flex justify-between gap-2">
                    <Link
                      href={`/ditails/${album.url_key}`}
                      className="bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-800 inline-block"
                    >
                      View All
                    </Link>

                    <button
                      onClick={() => handleAddToCart(album)}
                      className="inline-block bg-yellow-400 text-white px-6 py-2 text-sm font-semibold rounded hover:bg-yellow-700 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center text-sm flex flex-row justify-around">
        <p>
          <span className="text-gray-300">Copyright © 2022</span>{" "}
          <span className="font-semibold text-yellow-400">SKG PSD.</span>{" "}
          <span className="font-bold">All Right Reserved.</span>
        </p>
        <p>
          <Link href="/privacyPolicyPage">Privacy Policy</Link>
        </p>
      </footer>
    </>
  );
}
