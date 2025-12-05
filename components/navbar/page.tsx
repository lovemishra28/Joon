"use client";
import Image from "next/image";
import logo from "../assets/joon_logo.png";
import {
  ShoppingBag,
  User,
  ShoppingCart,
  List,
  Cat,
  StoreIcon,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  isLoggedin: boolean;
};

const Navbar = ({ isLoggedin }: Props) => {
  return (
    <nav className="border-b border-gray-200 py-8 px-4 md:px-8 flex justify-between items-center sticky z-50 bg-white/80 backdrop-blur-md supports-backdrop-filter:bg-white/60 text-black top-0 ">
      {/* 1. Left Side: Logo (Home Link) */}
      <div className="left flex items-center">
        <Link href="/">
          <div className="w-24 relative flex items-center justify-center">
            <Image src={logo} alt="Joon logo" className="object-contain" />
          </div>
        </Link>
      </div>

      {/* 2. Right Side: Navigation Icons */}
      <div className="right flex items-center">
        <div className="flex gap-2 sm:gap-10 items-center">
          <Link
            href="/seller/dashboard"
            className="hover:text-gray-600 transition"
          >
            <div className="font-semibold gap-2 hover:text-gray-700 flex justify-center items-center">
              <StoreIcon />
              Become a seller
            </div>
          </Link>
          <Link href="/shop" className="hover:text-gray-600 transition">
            <div className="rounded-full">
              <List className="w-6 h-6" />
            </div>
          </Link>
          <Link
            href="/cart"
            className="relative group hover:text-gray-600 transition"
          >
            <div className="rounded-full">
              <ShoppingCart className="w-6 h-6" />
              {isLoggedin ? (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-white">
                  0
                </span>
              ) : (
                ""
              )}
            </div>
          </Link>
          {isLoggedin ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="rounded-full">
                  <User className="w-6 h-6" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/profile">
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                </Link>
                <Link href="/myOrders">
                  <DropdownMenuItem className="cursor-pointer">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Orders
                  </DropdownMenuItem>
                </Link>
                {/* Dashboard for admin/seller reference */}
                <Link href="/">
                  <DropdownMenuItem className="cursor-pointer">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href={"/login"} className="hover:text-gray-600 transition">
              <div>Login</div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
