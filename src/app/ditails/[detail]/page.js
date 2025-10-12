"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import Navbar from "../../Componentes/Navbar/Navbar";
import Fromright from "../../Componentes/Formright/Formright";
import LightboxClient from "./LightboxClient";
import Link from "next/link";

// ✅ LocalStorage Cart Utility with Live Update
const addToCart = (product) => {
  if (typeof window === "undefined") return;

  const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemIndex = existingCart.findIndex((item) => item.id === product.id);

  if (itemIndex > -1) {
    existingCart[itemIndex].quantity += 1;
  } else {
    existingCart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(existingCart));

  // 🔴 Trigger a custom event for Navbar to update cart count instantly
  window.dispatchEvent(new Event("cartUpdated"));
};

// ✅ Main Page Component
export default function DetailPage({ params }) {
  const [album, setAlbum] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  // ✅ unwrap async params safely
  const [detail, setDetail] = useState(null);
  useEffect(() => {
    Promise.resolve(params).then((resolved) => {
      setDetail(resolved.detail);
    });
  }, [params]);

  // ✅ Fetch album data
  useEffect(() => {
    if (!detail) return;

    const fetchAlbum = async () => {
      try {
        const res = await fetch(
          `https://skgpsd.com/skgpsdbe/public/api/web/album/${detail}`,
          { cache: "no-store" }
        );
        if (res.ok) {
          const data = await res.json();
          const fetchedAlbum = data?.data?.album;
          setAlbum(fetchedAlbum);

          // Parse galleries
          try {
            const imgs = JSON.parse(fetchedAlbum?.galleries || "[]");
            setGalleryImages(imgs);
          } catch (err) {
            console.error("Error parsing galleries:", err);
          }
        }
      } catch (err) {
        console.error("Error fetching album:", err);
      }
    };

    fetchAlbum();
  }, [detail]);

  // ✅ Add to Cart Handler
  const handleAddToCart = () => {
    if (!album) return;
    const product = {
      id: album.id,
      name: album.name,
      image: album.cover_image || album.image,
      url_key: album.url_key,
      price: album.price || 99, // demo price
    };
    addToCart(product);
    alert(`${album.name} added to cart 🛒`);
  };

  if (!album) {
    return (
      <div className="p-10 text-center text-red-500 text-xl">
        Loading or Album not found...
      </div>
    );
  }

  return (
    <>
      <Navbar /> {/* 🟢 Will auto-update when cartUpdated event triggers */}

      <div className="p-6 flex flex-col lg:flex-row gap-8 min-h-screen">
        {/* Left: Gallery Section */}
        <div className="lg:w-2/3 w-full">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-3xl font-bold mb-6">{album.name}</h1>

            <button
              onClick={handleAddToCart}
              className="inline-block bg-yellow-400 text-white px-6 py-2 text-sm font-semibold rounded hover:bg-yellow-700 transition"
            >
              Add to Cart
            </button>
          </div>

          <LightboxClient galleryImages={galleryImages} />
        </div>

        {/* Right: Inquiry Form */}
        <div className="lg:w-1/3 w-full">
          <div className="sticky top-24 bg-white p-6 rounded shadow-md border">
            <Fromright albumId={album.id} />
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
          <Link href="/privacyPolicyPage">Privacy Policy Page</Link>
        </p>
      </footer>
    </>
  );
}
