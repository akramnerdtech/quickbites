// src/app/header/Header.js

"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartItemCount } = useCart();
  const { isLoggedIn, user, logout } = useAuth();
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // New state and handlers for the user dropdown
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.reload()
    router.push('/'); // Redirect to home page and forces a re-render
  };

  return (
    <div className="fixed w-full z-50">
      <nav className="bg-white bg-opacity-95 backdrop-blur-md h-18 flex items-center justify-between px-6 shadow-md relative">
        {/* Logo and Brand Name */}
        <div className="flex items-center">
          <Link
            href="/"
            className="text-3xl font-extrabold tracking-wide text-orange-600"
          >
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/Autosuggest/Top%20200%20queries/Burger.png"
              className="h-16 rounded-full p-1 w-16 object-fit"
              alt="QuickBites Logo"
            />
          </Link>
          <h1 onClick={() => router.push("/")} className="absolute text-orange-600 cursor-pointer font-extrabold ml-18 text-3xl">
            QuickBites
          </h1>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle navigation menu">
            {isMenuOpen ? (
              <FaTimes className="text-gray-800 text-2xl" />
            ) : (
              <FaBars className="text-gray-800 text-2xl" />
            )}
          </button>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 justify-end font-semibold text-gray-700 items-center">
          {["Home", "Offers", "Help"].map((item) => (
            <li key={item}>
              <Link
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="relative group"
              >
                <span className="hover:text-orange-600 transition-colors duration-300">
                  {item}
                </span>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
              </Link>
            </li>
          ))}
          {/* Conditional rendering for Login/Logout and user info */}
          {isLoggedIn ? (
            <li 
              className="relative"
              onMouseEnter={() => setIsUserMenuOpen(true)}
              onMouseLeave={() => setIsUserMenuOpen(false)}
            >
              <div className="flex items-center gap-2 cursor-pointer">
                <FaUserCircle className="text-gray-600  w-6 h-6" />
                <span className="text-gray-700 font-bold">{user?.name || "User"}</span>
              </div>
              {/* Dropdown Menu for Logout */}
              {isUserMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-max bg-white rounded-md shadow-lg py-1 z-10">
                  <button 
                    onClick={handleLogout} 
                    className="block w-full -mt-3 text-left px-4 py-1 text-sm text-black hover:text-white cursor-pointer hover:bg-orange-500"
                  >
                    Logout
                  </button>
              
                </div>
                   
              )}
            </li>
          ) : (
            <li>
              <Link href="/login" className="hover:text-orange-600 transition-colors duration-300 font-bold">
                Login
              </Link>
            </li>
          )}
          <li className="relative">
            <Link
              href="/cart"
              className="hover:text-orange-600 transition-colors duration-300"
            >
              <FaShoppingCart size={22} />
              <span className="absolute -top-2 -right-3 flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-red-600 rounded-full animate-bounce">
                {getCartItemCount()}
              </span>
            </Link>
          </li>
        </ul>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white bg-opacity-95 backdrop-blur-md shadow-md pb-6 animate-in slide-in-from-top">
            <ul className="flex flex-col items-center gap-4 font-medium text-gray-700 pt-4">
              {["Home",  "Offers", "Help"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="block py-2 px-4 hover:text-orange-600 transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              ))}
              {isLoggedIn ? (
                <>
                  <li className="flex items-center gap-2">
                    <FaUserCircle className="text-gray-600 w-6 h-6" />
                    <span className="text-gray-700 font-bold">{user?.name || "User"}</span>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className=" py-2 px-4  hover:text-orange-600 transition-colors duration-300"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    href="/login"
                    className="block py-2 px-4 hover:text-orange-600 transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href="/cart"
                  className="relative flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:border-orange-400 hover:text-orange-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaShoppingCart size={20} />
                  <span>Cart</span>
                  <span className="absolute top-1 right-1 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-red-600 rounded-full animate-bounce">
                    {getCartItemCount()}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}