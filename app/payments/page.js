"use client";

import Link from "next/link";
import { Banknote, CreditCard, ShieldCheck, Wallet } from "lucide-react";

const paymentOptions = [
  {
    icon: CreditCard,
    title: "Card payments",
    text: "Use supported debit and credit cards during checkout through the secure payment form.",
  },
  {
    icon: Banknote,
    title: "Cash on delivery",
    text: "Place the order first and pay when the delivery reaches you.",
  },
  {
    icon: Wallet,
    title: "Payment troubleshooting",
    text: "If checkout fails, you can retry from the cart or open the payments failed help page.",
  },
];

export default function PaymentsPage() {
  return (
    <main className="min-h-screen px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-[40px] bg-[linear-gradient(135deg,#e23744_0%,#f45b67_58%,#ff7f71_100%)] px-6 py-10 text-white shadow-[0_32px_90px_rgba(226,55,68,0.24)] sm:px-8 lg:px-10">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#ffd7db]">
            Payments
          </p>
          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
            Payment options and checkout guidance in one place.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/88">
            Review how card payments and cash on delivery work in the current QuickBites checkout flow.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {paymentOptions.map((option) => (
            <article
              key={option.title}
              className="rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff1f2] text-[#e23744]">
                <option.icon size={22} />
              </div>
              <h2 className="mt-4 text-xl font-black text-slate-900">{option.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-500">{option.text}</p>
            </article>
          ))}
        </div>

        <section className="mt-10 rounded-[36px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff1f2] text-[#e23744]">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">Need to retry a payment?</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
                Head back to the cart to choose a different payment method, or review the
                payments failed page for recovery steps.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/cart"
                  className="rounded-full bg-[#e23744] px-5 py-3 text-sm font-black text-white transition hover:bg-[#c91d2a]"
                >
                  Go to cart
                </Link>
                <Link
                  href="/payments-failed"
                  className="rounded-full border border-[#e23744]/20 px-5 py-3 text-sm font-black text-[#e23744] transition hover:bg-[#fff1f2]"
                >
                  Payments failed help
                </Link>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
