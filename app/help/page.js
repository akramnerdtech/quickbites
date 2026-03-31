"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import {
  ChevronDown,
  CreditCard,
  Headphones,
  IndianRupee,
  List,
  Mail,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  User,
} from "lucide-react";

const helpTopics = [
  {
    id: "orders",
    title: "Orders and delivery",
    questions: [
      {
        q: "How can I track my order?",
        a: "You can track your order in real time from the My Orders page after checkout. Every stage updates automatically.",
      },
      {
        q: "What if my food is late?",
        a: "Please check the latest ETA first. If the estimate has passed, use Contact support and we will help from there.",
      },
      {
        q: "Can I cancel my order?",
        a: "Orders can usually be cancelled only before the restaurant begins preparation, depending on the status of the order.",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments and refunds",
    questions: [
      {
        q: "What payment methods are available?",
        a: "We support card payments and cash on delivery in the current checkout flow.",
      },
      {
        q: "How do I get a refund?",
        a: "Refunds are sent back to the original payment source after cancellation or issue review, depending on the payment method used.",
      },
    ],
  },
  {
    id: "account",
    title: "Account and profile",
    questions: [
      {
        q: "How do I update my profile details?",
        a: "Use the Profile page to review your account information and sign in if you are not logged in yet.",
      },
      {
        q: "I forgot my password. What should I do?",
        a: "Use the sign-in flow and your registered credentials. Password reset can be added later if you want a deeper auth system.",
      },
    ],
  },
];

const quickLinks = [
  {
    title: "Track My Order",
    description: "Check order progress and delivery stages.",
    icon: ShoppingBag,
    href: "/my-orders",
  },
  {
    title: "Manage Payments",
    description: "View payment options and checkout notes.",
    icon: CreditCard,
    href: "/payments",
  },
  {
    title: "Update Profile",
    description: "Review your sign-in status and account info.",
    icon: User,
    href: "/profile",
  },
  {
    title: "My Recent Orders",
    description: "See your saved order history and totals.",
    icon: List,
    href: "/my-orders",
  },
  {
    title: "Payments Failed",
    description: "Get help when checkout does not complete.",
    icon: IndianRupee,
    href: "/payments-failed",
  },
];

const supportHighlights = [
  {
    title: "Fast answers",
    text: "Search common issues before contacting support.",
    icon: Sparkles,
  },
  {
    title: "Secure checkout help",
    text: "Payment and refund help stays one click away.",
    icon: ShieldCheck,
  },
  {
    title: "Real support paths",
    text: "Every quick link now opens a working page.",
    icon: Headphones,
  },
];

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTopics = useMemo(
    () =>
      helpTopics
        .map((topic) => ({
          ...topic,
          questions: topic.questions.filter(
            (question) =>
              question.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
              question.a.toLowerCase().includes(searchTerm.toLowerCase())
          ),
        }))
        .filter((topic) => topic.questions.length > 0),
    [searchTerm]
  );

  return (
    <main className="min-h-screen px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[40px] bg-[linear-gradient(135deg,#e23744_0%,#f45b67_58%,#ff7f71_100%)] px-6 py-10 text-white shadow-[0_32px_90px_rgba(226,55,68,0.24)] sm:px-8 lg:px-10">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#ffd7db]">
              Help center
            </p>
            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
              Support that looks polished and actually takes you somewhere useful.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/88">
              Search for answers, jump into account and payment pages, and move through
              the help flow without hitting dead links.
            </p>

            <label className="relative mt-8 block max-w-2xl">
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search for order, payment, refund or account help"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-full border border-white/12 bg-white px-5 py-4 pl-[52px] text-slate-900 outline-none transition focus:border-[#e23744]"
              />
            </label>
          </div>

          <div className="grid gap-4">
            {supportHighlights.map((item) => (
              <article
                key={item.title}
                className="rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff1f2] text-[#e23744]">
                  <item.icon size={22} />
                </div>
                <h2 className="mt-4 text-xl font-black text-slate-900">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-slate-500">{item.text}</p>
              </article>
            ))}
          </div>
        </div>

        <section className="mt-12">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#e23744]">
                Quick links
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
                Working support shortcuts
              </h2>
            </div>
            <Link
              href="/contact"
              className="hidden rounded-full border border-[#e23744]/20 px-5 py-3 text-sm font-black text-[#e23744] transition hover:bg-[#fff1f2] sm:inline-flex"
            >
              Contact support
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {quickLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="rounded-[28px] border border-slate-200/80 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-[#e23744]/30 hover:shadow-[0_24px_70px_rgba(15,23,42,0.1)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff1f2] text-[#e23744]">
                  <link.icon size={22} />
                </div>
                <p className="mt-4 text-sm font-black text-slate-900">{link.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">{link.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-[36px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#e23744]">
                Knowledge base
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
                Popular questions
              </h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Mail size={16} className="text-[#e23744]" />
              support@quickbites.com
            </div>
          </div>

          <div className="mt-8 space-y-8">
            {filteredTopics.length > 0 ? (
              filteredTopics.map((topic) => (
                <div key={topic.id}>
                  <h3 className="text-xl font-black text-[#e23744]">{topic.title}</h3>
                  <div className="mt-4 space-y-4">
                    {topic.questions.map((item) => (
                      <details
                        key={item.q}
                        className="group rounded-[28px] border border-slate-200 p-5 transition hover:border-[#e23744]/30"
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                          <span className="text-base font-black text-slate-900">{item.q}</span>
                          <ChevronDown className="text-slate-400 transition group-open:rotate-180 group-open:text-[#e23744]" />
                        </summary>
                        <p className="mt-4 text-sm leading-7 text-slate-500">{item.a}</p>
                      </details>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="rounded-[28px] bg-slate-50 px-5 py-6 text-sm text-slate-500">
                No results found for "{searchTerm}".
              </p>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
