"use client";

import User from "@/models/UserModel";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function login() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/api/user/login", user);
      if (res.data.success) {
        localStorage.setItem("userId", res.data.user.id);
        toast.success("Welcome back!", { duration: 3000 });
        console.log("Login Successful!");
        router.push("/");
        router.refresh();
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      if (error.response && error.response.data) {
        setError(error.response.message);
      } else {
        setError("Something went Wrong. Pls try again");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)] bg-[#F3F4F6] p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Sign in to continue to your account.
        </p>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-orange-500 hover:text-orange-600"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
