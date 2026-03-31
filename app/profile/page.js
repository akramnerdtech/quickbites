"use client";

import Link from "next/link";
import { LogIn, Mail, ShieldCheck, UserCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { isHydrated, isLoggedIn, user } = useAuth();

  return (
    <main className="min-h-screen px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-[40px] bg-[linear-gradient(135deg,#e23744_0%,#f45b67_58%,#ff7f71_100%)] px-6 py-10 text-white shadow-[0_32px_90px_rgba(226,55,68,0.24)] sm:px-8 lg:px-10">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#ffd7db]">
            Profile
          </p>
          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
            Account details, sign-in status, and profile access.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/88">
            This page confirms whether you are signed in and gives you a clean starting point for account-related actions.
          </p>
        </div>

        <section className="mt-10 rounded-[36px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-8">
          {!isHydrated ? (
            <p className="text-sm text-slate-500">Loading account details...</p>
          ) : isLoggedIn ? (
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff1f2] text-[#e23744]">
                <UserCircle2 size={26} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900">{user?.name || "QuickBites User"}</h2>
                <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                  <Mail size={16} className="text-[#e23744]" />
                  {user?.email || "No email available"}
                </div>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#eefaf1] px-4 py-2 text-sm font-black text-[#24963f]">
                  <ShieldCheck size={16} />
                  Signed in and active
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff1f2] text-[#e23744]">
                <LogIn size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900">You are not signed in</h2>
                <p className="mt-2 text-sm leading-7 text-slate-500">
                  Sign in to access account-specific actions, saved orders, and a smoother checkout experience.
                </p>
                <Link
                  href="/login"
                  className="mt-5 inline-flex rounded-full bg-[#e23744] px-5 py-3 text-sm font-black text-white transition hover:bg-[#c91d2a]"
                >
                  Sign in now
                </Link>
              </div>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
