"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import { AuthAPI } from "../utils/api";
export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

       try {
            const res = await AuthAPI.register({
              first_name: name,
              email,
              phone,
              password,
            });

            // ✅ Check Laravel response status (even if HTTP 200)
            if (!res.data.success) {
              const errors = res.data.errors || {};
              const firstError = Object.values(errors)[0]?.[0] || "Registration failed.";
              setError(firstError);
              return;
            }

            alert("Account created successfully!");
            router.push("/"); // redirect to home page

            // Optional: Notify Navbar or other components
          //  window.dispatchEvent(new Event("userLoggedIn"));
          } catch (err) {
            console.error("Signup Error:", err);

            if (err.response?.data?.data?.errors) {
              const errors = err.response.data.data.errors;
              const firstError = Object.values(errors)[0]?.[0] || "Validation failed.";
              setError(firstError);
            } else if (err.response?.data?.message) {
              setError(err.response.data.message);
            } else {
              setError("Failed to create account. Try again.");
            }
          }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

        {error && (
          <p className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</p>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
           <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

           <div>
            <label className="block mb-1 font-semibold">Phone</label>
            <input
              type="tel"
              className="w-full border px-3 py-2 rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Confirm Password</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
