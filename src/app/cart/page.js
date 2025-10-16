"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../Componentes/Navbar/Navbar";
import Footer from "../Componentes/Footer/Footer";
import { OrderAPI } from "../utils/api";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [user, setUser] = useState(null); // local user data
  const baseImageUrl = "https://skgpsd.com/skgpsdbe/public/";
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    payment_id: "",
    items: [],
    amount: 0,
  });

  // 🧩 Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
  }, []);

  // 🛒 Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);

    console.log(storedCart);

    let storedUser = null;
    try {
      const userData = localStorage.getItem("user");
      if (userData && userData !== "undefined" && userData !== "null") {
        storedUser = JSON.parse(userData);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      storedUser = null;
    }
    setUser(storedUser);
  }, []);

  // ❌ Remove item from cart
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // 💳 Razorpay Payment
  const loadRazorpay = (amount, itemNames) => {
    if (!razorpayLoaded) {
      alert("Payment system is loading, please try again in a moment.");
      return;
    }

    const options = {
      key: "rzp_live_RQ80xbBVO2uAeX",
      amount: 1 * 100,
      currency: "INR",
      name: "PSD Album Shop",
      description: `Buying: ${itemNames}`,
     handler: function (response) {
            const userData = JSON.parse(localStorage.getItem("user") || "{}"); // ensure user exists

            const orderData = {
              user_id: userData.id,
              amount: amount,
              payment_id: response.razorpay_payment_id,
              items: cartItems.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                url: item.url_key,
              })),
            };

           
            (async () => {
              try {
                const res = await OrderAPI.saveOrder(orderData);
               
                setOrderDetails({
                    payment_id: response.razorpay_payment_id,
                    items: orderData.items,
                    amount: amount,
                  });
                  setOrderSuccess(true);

                // Clear cart
                localStorage.removeItem("cart");
                setCartItems([]);
                window.dispatchEvent(new Event("cartUpdated"));
              } catch (err) {
                console.error("Order save failed:", err);
                alert("⚠️ Failed to save order. Please contact support.");
              }
            })();
          },

      prefill: {
        name: user?.name || "",
        email: user?.email || "",
        contact: user?.phone || "",
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // 🛍️ Buy single item
  const handleBuyNow = (item) => {
    if (!user) {
      alert("Please login first to purchase items.");
      window.location.href = "/login";
      return;
    }
    const amount = item.price || 99;
    loadRazorpay(amount, item.name);
  };

  // 💼 Buy all items
  const handleBuyAll = () => {
    if (!user) {
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
            {/* 🧺 Cart Items */}
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
      {orderSuccess && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-600">
        Thank You for Your Purchase!
      </h2>

      <p className="mb-2 text-gray-700">
        <span className="font-semibold">Payment ID:</span> {orderDetails.payment_id}
      </p>

      <p className="mb-4 text-gray-700">
        <span className="font-semibold">Total Amount:</span> ₹{orderDetails.amount}
      </p>

      <h3 className="text-lg font-semibold mb-2">Items Purchased:</h3>

      <div className="overflow-y-auto max-h-48 border-t border-b border-gray-200 py-2">
        <div className="grid grid-cols-3 gap-2 font-semibold text-gray-800 px-2 py-1 border-b border-gray-100">
          <span>Item</span>
          <span className="text-right">Price</span>
          <span className="text-center">View</span>
        </div>

        {orderDetails.items.map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-3 gap-2 items-center px-2 py-1 border-b border-gray-100"
          >
            <span className="truncate">{item.name}</span>
            <span className="text-right">₹{item.price}</span>
            <span className="text-center">
              <a
                href={`/${item.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View
              </a>
            </span>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <button
          onClick={() => setOrderSuccess(false)}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

      <Footer />
    </>
  );
}
