"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaUserCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { ChevronDown, Search } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const navItems = [
  { label: "Offers", href: "/offers" },
  { label: "Help", href: "/help" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { getCartItemCount } = useCart();
  const { isHydrated, isLoggedIn, user, logout } = useAuth();
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen((value) => !value);

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
    logout();
    router.push("/");
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const target = searchValue.trim();
    router.push(target ? `/?q=${encodeURIComponent(target)}` : "/");
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/40 bg-white/92 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e23744] shadow-[0_14px_40px_rgba(226,55,68,0.28)] transition-transform duration-300 hover:-translate-y-0.5"
            aria-label="QuickBites home"
          >
            <span className="text-xl font-black text-white">Q</span>
          </Link>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="hidden text-left sm:block"
          >
            <p className="text-lg font-black tracking-tight text-slate-900">
              QuickBites
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <FaMapMarkerAlt className="text-[#e23744]" />
              <span className="font-semibold text-slate-900">Deliver to Home</span>
              <span className="max-w-40 truncate">Fresh meals in minutes</span>
            </div>
          </button>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <form onSubmit={handleSearchSubmit} className="relative w-72">
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search for restaurants or dishes"
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#e23744] focus:bg-white"
            />
          </form>

          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-semibold text-slate-600 transition-colors hover:text-[#e23744]"
            >
              {item.label}
            </Link>
          ))}

          {!isHydrated ? (
            <div className="h-10 w-28 animate-pulse rounded-full bg-slate-100" />
          ) : isLoggedIn ? (
            <div
              className="relative"
              onMouseEnter={() => setIsUserMenuOpen(true)}
              onMouseLeave={() => setIsUserMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsUserMenuOpen((value) => !value)}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-[#e23744]/30 hover:text-[#e23744]"
              >
                <FaUserCircle className="text-base" />
                <span>{user?.name || "User"}</span>
                <ChevronDown size={16} />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-0 cursor-pointer w-44 rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_18px_60px_rgba(15,23,42,0.12)]">
                  <button
                    onClick={handleLogout}
                    className="w-full rounded-xl px-3 py-2 text-left cursor-pointer text-sm font-semibold text-slate-700 transition-colors hover:bg-[#fff1f2] hover:text-[#e23744]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-[#e23744]/40 hover:bg-[#fff1f2] hover:text-[#e23744]"
            >
              Sign In
            </Link>
          )}

          <Link
            href="/cart"
            className="relative flex items-center gap-2 rounded-full  px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
          >
            <FaShoppingCart size={16} />
            Cart
            <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#e23744] px-1.5 text-xs font-bold text-white">
              {getCartItemCount()}
            </span>
          </Link>
        </div>

        <button
          type="button"
          onClick={toggleMenu}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-800 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                router.push("/");
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-2 rounded-2xl bg-[#fff1f2] px-4 py-3 text-left text-sm font-semibold text-[#e23744]"
            >
              <FaMapMarkerAlt />
              Deliver to Home
            </button>

            <form onSubmit={handleSearchSubmit} className="relative">
              <Search
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search restaurants or dishes"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#e23744] focus:bg-white"
              />
            </form>

            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {!isHydrated ? (
              <div className="h-12 rounded-2xl bg-slate-100" />
            ) : isLoggedIn ? (
              <>
                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">
                  <FaUserCircle />
                  {user?.name || "User"}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                  className="rounded-2xl px-4 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}

            <Link
              href="/cart"
              className="flex items-center justify-between rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex items-center gap-2">
                <FaShoppingCart size={16} />
                Cart
              </span>
              <span className="rounded-full bg-[#e23744] px-2 py-1 text-xs font-bold">
                {getCartItemCount()}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
