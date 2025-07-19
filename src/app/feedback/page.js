"use client";
import { useState } from "react";
import Navbar from "../Componentes/Navbar/Navbar";
import Link from "next/link";

const screenshots = [
  "/Images/feedback/feedback-1.jpeg",
  "/Images/feedback/feedback-2.jpeg",
  "/Images/feedback/feedback-3.jpeg",
  "/Images/feedback/feedback-4.jpeg",
  "/Images/feedback/feedback-5.jpeg",
  "/Images/feedback/feedback-6.jpeg",
  "/Images/feedback/feedback-7.jpeg",
  "/Images/feedback/feedback-8.jpeg",
  "/Images/feedback/feedback-9.jpeg",
];

export default function FeedbackFormPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    screenshot: null,
    rating: "", // 👈 Add this line
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "screenshot") {
      setFormData({ ...formData, screenshot: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Thank you for your feedback!");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-white py-10 px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Client Feedback
          </h1>
          <p className="text-gray-600">
            Help us improve by sharing your suggestions, issues, or general
            thoughts. You can even upload a screenshot for better clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto items-stretch">
          {/* Feedback Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg w-full h-auto p-6 space-y-4"
          >
            {/* Rating Field */}
           

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Rate Us
              </label>
              <div className="flex items-center space-x-4">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <label key={rating} className="flex items-center space-x-1">
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      onChange={handleChange}
                      className="accent-orange-500"
                    />
                    <span className="text-sm text-gray-600">{rating}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Your Feedback
              </label>
              <textarea
                name="message"
                rows="3"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-black hover:bg-black text-white px-6 py-2 rounded-md transition duration-200"
            >
              Submit Feedback
            </button>
          </form>

          {/* Right Side Main Screenshot */}
          {screenshots.length > 0 && (
            <div className="w-full h-full flex justify-center items-center">
              <img
                src={screenshots[0]}
                alt="Main Screenshot"
                className="w-full max-h-[500px] object-contain rounded-lg shadow"
              />
            </div>
          )}
        </div>

        {/* Additional Screenshots Below Form */}
        {screenshots.length > 1 && (
          <div className="mt-8 flex flex-wrap gap-6 justify-center">
            {screenshots.slice(1).map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Screenshot ${idx + 2}`}
                className="w-72 max-h-[500px] object-contain rounded-lg shadow border border-gray-200"
              />
            ))}
          </div>
        )}
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
