"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { auth } from "../firebase";
import Navbar from "../Componentes/Navbar/Navbar";
import Footer from "../Componentes/Footer/Footer";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const baseImageUrl = "https://skgpsd.com/skgpsdbe/public/";

  // Load Razorpay script dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
  }, []);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  }, []);

  // Remove item from cart
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Razorpay payment
  const loadRazorpay = (amount, itemNames) => {
    if (!razorpayLoaded) {
      alert("Payment system is loading, please try again in a moment.");
      return;
    }

    const options = {
      key: "YOUR_RAZORPAY_KEY",
      amount: amount * 100,
      currency: "INR",
      name: "PSD Album Shop",
      description: `Buying: ${itemNames}`,
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        localStorage.removeItem("cart");
        setCartItems([]);
        window.dispatchEvent(new Event("cartUpdated"));
      },
      prefill: {
        name: auth.currentUser?.displayName || "Customer",
        email: auth.currentUser?.email || "customer@example.com",
        contact: auth.currentUser?.phoneNumber || "9999999999",
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Buy single item
  const handleBuyNow = (item) => {
    if (!auth.currentUser) {
      alert("Please login first to purchase items.");
      window.location.href = "/login";
      return;
    }
    const amount = item.price || 99;
    loadRazorpay(amount, item.name);
  };

  // Buy all items
  const handleBuyAll = () => {
    if (!auth.currentUser) {
      alert("Please login first to purchase items.");
      window.location.href = "/login";
      return;
    }

    if (cartItems.length === 0) return;

    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price || 99), 0);
    const itemNames = cartItems.map((i) => i.name).join(", ");
    loadRazorpay(totalAmount, itemNames);
  };

  // 🧮 Total Price
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price || 99), 0);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2 text-center">Your Cart</h1>

        {cartItems.length > 0 && (
          <p className="text-center text-gray-700 mb-4">
            You have <span className="font-semibold">{cartItems.length}</span>{" "}
            item{cartItems.length > 1 ? "s" : ""} in your cart
          </p>
        )}

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty 🛒</h2>
            <p className="text-gray-600">Add some albums to see them here!</p>
            <Link
              href="/"
              className="mt-4 inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {cartItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="bg-white border rounded shadow hover:shadow-lg transition"
                >
                  <Image
                    src={baseImageUrl + item.image}
                    alt={item.name}
                    width={400}
                    height={300}
                    className="rounded-t"
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h3>

                    {/* 💰 Item Price */}
                    <p className="text-green-600 font-semibold text-md mt-2">
                      Price: ₹{item.price || 99}
                    </p>

                    <div className="flex justify-center gap-3 mt-4">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 cursor-pointer text-white px-4 py-2 text-sm rounded hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => handleBuyNow(item)}
                        className="bg-green-500 cursor-pointer text-white px-4 py-2 text-sm rounded hover:bg-green-600 transition"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 🧾 Total Price Section */}
            <div className="text-center mt-10 border-t pt-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Total Price: ₹{totalPrice}
              </h2>

              <button
                onClick={handleBuyAll}
                className="bg-green-600 cursor-pointer text-white px-6 py-3 rounded hover:bg-green-700 transition"
              >
                Buy All ({cartItems.length} item
                {cartItems.length > 1 ? "s" : ""})
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
