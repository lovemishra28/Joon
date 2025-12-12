"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../assets/joon_logo.png";
import {
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-linear-to-r bg-orange-500 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-orange-100">
                Get the latest products, deals, and exclusive offers delivered to your inbox.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white text-gray-900 placeholder:text-gray-500 flex-1"
                required
              />
              <Button
                type="submit"
                className="bg-white text-orange-600 hover:bg-orange-50"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </div>
          {subscribed && (
            <div className="mt-4 text-sm bg-black bg-opacity-30 p-2 rounded">
              ✓ Thank you for subscribing!
            </div>
          )}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="w-20 relative flex items-center justify-center">
                <Image src={logo} alt="Joon logo" className="object-contain" />
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Your trusted online marketplace for quality products and exceptional service.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="hover:text-orange-500 transition"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="hover:text-orange-500 transition"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="hover:text-orange-500 transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-orange-500 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-orange-500 transition">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-orange-500 transition">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-orange-500 transition">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/myOrders" className="hover:text-orange-500 transition">
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-orange-500 transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition">
                  Track Order
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-orange-500 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition">
                  Press
                </a>
              </li>
              <li>
                <Link
                  href="/seller/dashboard"
                  className="hover:text-orange-500 transition"
                >
                  Become a Seller
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal & Contact</h4>
            <ul className="space-y-2 text-sm mb-6">
              <li>
                <a href="#" className="hover:text-orange-500 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition">
                  Cookies Policy
                </a>
              </li>
            </ul>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-orange-500" />
                <a href="mailto:support@joon.com" className="hover:text-orange-500 transition">
                  support@joon.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-orange-500" />
                <a href="tel:+1234567890" className="hover:text-orange-500 transition">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-orange-500 mt-1" />
                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <div>
            <p>
              &copy; {currentYear} Joon. All rights reserved. | Designed with ❤️ for
              seamless shopping
            </p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-orange-500 transition">
              Accessibility
            </a>
            <a href="#" className="hover:text-orange-500 transition">
              Site Map
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
