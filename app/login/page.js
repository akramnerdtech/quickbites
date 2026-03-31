"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ShieldCheck, Timer } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();
  const demoUsers = [
    { email: "ayan@gmail.com", password: "ayan123", name: "Ayan khan" },
    { email: "akram@gmail.com", password: "akram123", name: "Akram" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user);
        router.push("/");
      } else {
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.92fr]">
        <section className="relative overflow-hidden rounded-[36px] bg-slate-900 px-6 py-8 text-white shadow-[0_32px_90px_rgba(15,23,42,0.18)] sm:px-8 sm:py-10">
          <div className="absolute -left-8 top-10 h-32 w-32 rounded-full bg-[#e23744]/20 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-40 w-40 rounded-full bg-white/8 blur-3xl" />

          <div className="relative">
            <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#ffb38d]">
              QuickBites access
            </p>
            <h1 className="mt-6 max-w-lg text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Sign in and pick up exactly where your cravings left off.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
              Save addresses, track orders live, manage your cart faster, and keep
              the delivery flow feeling smooth across every visit.
            </p>

            <div className="mt-10 space-y-4">
              <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
                <div className="flex items-center gap-3 text-lg font-bold">
                  <Timer className="text-[#e23744]" size={20} />
                  Faster reorder flow
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Jump back into recent meals and checkout with fewer steps.
                </p>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
                <div className="flex items-center gap-3 text-lg font-bold">
                  <ShieldCheck className="text-[#e23744]" size={20} />
                  Safe account experience
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Your profile, order history, and saved details stay in one place.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[36px] border border-slate-200/80 bg-white p-6 shadow-[0_28px_80px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="max-w-md">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e23744]">
              Welcome back
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
              Sign in to continue
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Use your email and password to access your orders, cart, and delivery
              details.
            </p>
          </div>

          {/* <div className="mt-6 rounded-[28px] border border-[#ffd4d8] bg-[#fff1f2] p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#e23744]">
              Demo accounts
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {demoUsers.map((demo) => (
                <button
                  key={demo.email}
                  type="button"
                  onClick={() => {
                    setEmail(demo.email);
                    setPassword(demo.password);
                  }}
                  className="rounded-2xl border border-white bg-white px-4 py-3 text-left transition hover:border-[#e23744]/30 hover:shadow-sm"
                >
                  <p className="text-sm font-bold text-slate-900">{demo.name}</p>
                  <p className="mt-1 text-xs text-slate-500">{demo.email}</p>
                </button>
              ))}
            </div>
          </div> */}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#e23744] focus:bg-white"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#e23744] focus:bg-white"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center mt-40 cursor-pointer justify-center gap-2 rounded-full bg-[#e23744] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#c91d2a] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
              {!loading && <ChevronRight size={18} />}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
