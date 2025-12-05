"use client";

import User from "@/models/UserModel";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
        console.log("Login Successful!");
        router.push("/");
        router.refresh();
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        setError(error.response.message);
      } else {
        setError("Something went Wrong. Pls try again");
      }
    }
  };

  return (
    <div className="flex items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center">
      <div className="border rounded flex flex-col items-center justify-center ">
        <h1 className="w-full py-2 bg-orange-400 text-center">Login</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="flex flex-col justify-center items-baseline p-4 gap-4">
          <div className="flex justify-center items-center">
            <input
            placeholder="Email"
              type="email"
              value={user.email}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
              required className="p-2 outline-none border-2 border-gray-400 rounded text-black text-center"
            />
          </div>
          <div className="flex justify-center items-center">
            <input
            placeholder="Password"
              type="password"
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
              required className="p-2 outline-none border-2 border-gray-400 rounded text-black text-center"
            />
          </div>

          <div className="w-full flex items-center justify-center mt-4">
            <button type="submit" className="p-2 w-max text-center cursor-pointer bg-orange-400 rounded hover:bg-orange-500 transition">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
