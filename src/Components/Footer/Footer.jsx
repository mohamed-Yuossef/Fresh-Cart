import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 pt-10 pb-6 transition-colors duration-300">
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
        {/* Logo and About */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            FreshCart
          </h2>
          <p className="text-sm leading-relaxed">
            The best online store providing you with fresh products and top
            quality at great prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-green-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-green-500 transition">
                Products
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-green-500 transition">
                Cart
              </Link>
            </li>
            <li>
              <Link
                to="/wishList"
                className="hover:text-green-500 transition"
              >
                WishList
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Contact Us
          </h3>
          <ul className="space-y-2 text-sm">
            <li>📞 +20 100 123 4567</li>
            <li>📧 support@freshcart.com</li>
            <li>📍 Cairo, Egypt</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Follow Us
          </h3>
          <div className="flex space-x-3">
            <a
              to="#"
              className="bg-gray-200 dark:bg-gray-800 p-2 rounded-full hover:bg-green-500 hover:text-white transition"
            >
              <FaFacebookF />
            </a>
            <a
              to="#"
              className="bg-gray-200 dark:bg-gray-800 p-2 rounded-full hover:bg-green-500 hover:text-white transition"
            >
              <FaInstagram />
            </a>
            <a
              to="#"
              className="bg-gray-200 dark:bg-gray-800 p-2 rounded-full hover:bg-green-500 hover:text-white transition"
            >
              <FaTwitter />
            </a>
            <a
              to="#"
              className="bg-gray-200 dark:bg-gray-800 p-2 rounded-full hover:bg-green-500 hover:text-white transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 dark:border-gray-700 my-6"></div>

      {/* Bottom text */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} FreshCart. All rights reserved.
      </div>
    </footer>
  );
}
