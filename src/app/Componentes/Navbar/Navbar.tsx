"use client";
import Image from "next/image";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { Phone, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import clsx from "clsx";
const albums = [
  { slug: "12x36" },
  { slug: "18x24" },
  { slug: "20x30" },
  { slug: "14x40" },
];
type Category = {
  id: number;
  name: string;
  url_key: string;
};


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [albumDropdownOpen, setAlbumDropdownOpen] = useState(false); // for mobile
  const [user, setUser] = useState<any>();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("authToken");
      const userData = localStorage.getItem("user");
      
      if (token && userData) {
        setIsLoggedIn(true);
       setUser(JSON.parse(userData));
      } else {
        setIsLoggedIn(false);
        setUser({});
      }
    };

    checkLogin();

    // Listen for global login/logout events
    window.addEventListener("userLoggedIn", checkLogin);
    window.addEventListener("userLoggedOut", checkLogin);

    return () => {
      window.removeEventListener("userLoggedIn", checkLogin);
      window.removeEventListener("userLoggedOut", checkLogin);
    };
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "https://skgpsd.com/skgpsdbe/public/api/web/categories"
      );
      if (res.data?.data?.categories) {
        setCategories(res.data.data.categories);
      } else {
        console.warn("No categories found in API response.");
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // function to update cart count
    const updateCartCount = () => {
      const stored = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(stored.length);
    };

    updateCartCount(); // initial load

    // listen for custom event
    window.addEventListener("cartUpdated", updateCartCount);

    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  const [showProfile, setShowProfile] = useState(false);

  // Simulated login state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // false = not logged in

  
  const handleProfileClick = () => {
    
    if (isLoggedIn) {
      setShowProfile(true);
    } else {
      alert("Please login first!");
      // Redirect to login page
      window.location.href = "/login";
    }
  };

 const LogOut = () => {
  if (confirm("Are you sure you want to log out?")) {
    
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

   
    window.dispatchEvent(new Event("userLoggedOut"));

    // Update local state
    setShowProfile(false);
    setIsLoggedIn(false);
    setUser(null);

    alert("You have been logged out successfully!");

   
    window.location.href = "/";
  }
};


  return (
    <header className="sticky top-0 bg-white shadow px-4 md:px-10 py-4 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="/Images/skg-logo.png"
              alt="Logo"
              width={180}
              height={90}
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-base text-black font-medium relative">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>

          {/* Dropdown */}
          <div className="relative group">
            <div className="flex items-center gap-1 cursor-pointer">
              <Link href="#" className="hover:text-pink-600 transition">
                Album PSD
              </Link>
              <ChevronDown
                size={16}
                className="text-gray-500 group-hover:text-pink-600 transition"
              />
            </div>
            <div className="absolute left-0 mt-2 w-48 bg-white border rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 z-10">
              <ul className="py-2">
                {categories.map((cat, index) => {
                  return (
                    <li
                      key={cat?.id}
                      className={
                        index !== albums.length - 1
                          ? "border-b border-gray-200"
                          : ""
                      }
                    >
                      <Link
                        href={`/album/${cat.url_key}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-100 hover:text-pink-600"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <Link href="/courses">Courses</Link>
          <Link href="/invitationVideo">Invitation Video</Link>
          <Link href="/clipArt">Clip Art</Link>
          <Link href="/feedback">Client</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/cart" className="relative flex items-center">
            <span className="mr-1">Cart</span>
            <FiShoppingCart className="text-2xl" />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* <Link href="/cart" className="flex items-center justify-center gap-2">
            
           <FaShoppingCart className="text-2xl" />
           <span>Cart</span>
          </Link> */}

        

          {showProfile && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-xl font-bold mb-4">User Profile</h2>
                <p>
                  <span className="font-semibold">Name: </span>
                  {user.first_name}
                </p>
                <p className="mt-2">
                  <span className="font-semibold">Email: </span>
                  {user.email}
                </p>
                 <p className="mt-2">
                  <span className="font-semibold">Phone: </span>
                  {user.phone}
                </p>

                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={LogOut}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                  <button
                    onClick={() => setShowProfile(false)}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Desktop Contact */}
        <div className="hidden md:flex items-center gap-5">
         
          {/* <a href="tel:+91 9990144668">
            <div className="text-sm leading-tight">
              <p className="text-gray-600">Contact us</p>
              <p className="font-bold text-black">+91 9990144668</p>
            </div>
          </a> */}
          <div className="flex items-center gap-4">
            {/* Profile Button */}
            <button
              onClick={handleProfileClick}
              className="w-10 h-10 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white rounded-full transition"
            >
              <FiUser size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Cart Icon (Visible only on mobile) */}
        <Link href="/cart" className="relative flex items-center md:hidden">
          <span className="mr-1">Cart</span>
          <FiShoppingCart className="text-2xl" />

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
        {/* <Link
  href="/cart"
  className="flex items-center gap-1 text-black md:hidden"
>
  <FaShoppingCart className="text-2xl" />
  <span className="text-sm font-medium">Cart</span>
</Link> */}

        {/* Mobile Hamburger */}
        <button onClick={() => setOpen(true)} className="md:hidden z-50">
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={clsx(
          "fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 p-6 space-y-6",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex justify-between items-center mb-6">
          <Link href="/">
            <Image
              src="/Images/skg-logo.png"
              alt="Logo"
              width={180}
              height={90}
            />
          </Link>

          <button onClick={() => setOpen(false)}>
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* Mobile Nav Links */}
        <nav className="flex flex-col space-y-4 text-base font-medium text-gray-800">
          <Link href="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link href="/about" onClick={() => setOpen(false)}>
            About
          </Link>

          {/* Clickable Dropdown */}
          <div>
            <div
              className="flex items-center justify-between py-2 cursor-pointer"
              onClick={() => setAlbumDropdownOpen(!albumDropdownOpen)}
            >
              <span className="text-gray-700 hover:text-pink-600 transition font-medium">
                Album PSD
              </span>
              <ChevronDown
                size={16}
                className={clsx(
                  "transition-transform",
                  albumDropdownOpen && "rotate-180"
                )}
              />
            </div>

            {/* Dropdown Items (only visible when open) */}
            {albumDropdownOpen && (
              <ul className="pl-4 border-l border-gray-200">
                {categories.map((cat, index) => (
                  <li
                    key={cat.id}
                    className={
                      index !== categories.length - 1
                        ? "border-b border-gray-200"
                        : ""
                    }
                  >
                    <Link
                      href={`/album/${cat.url_key}`}
                      className="block py-2 text-sm text-gray-700 hover:text-pink-600"
                      onClick={() => {
                        setOpen(false);
                        setAlbumDropdownOpen(false);
                      }}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link href="/courses" onClick={() => setOpen(false)}>
            Courses
          </Link>
          <Link href="/invitationVideo" onClick={() => setOpen(false)}>
            Invitation Video
          </Link>
          <Link href="/clipArt" onClick={() => setOpen(false)}>
            Clip Art
          </Link>
          <Link href="/feedback">Client</Link>

          <Link href="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>
        </nav>

        {/* Mobile Contact */}
        <div className="flex items-center gap-3 pt-6 border-t">
          <div className="bg-red-500 text-white p-2 rounded-full">
            <Phone size={20} />
          </div>
          <div className="text-sm">
            <p className="text-gray-600">Contact us</p>
            <p className="font-bold text-black">+91 9990144668</p>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-30"
        />
      )}
    </header>
  );
}
