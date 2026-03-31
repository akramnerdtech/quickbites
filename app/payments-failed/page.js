"use client";

import Link from "next/link";
import { AlertTriangle, CreditCard, RefreshCw, ShieldCheck } from "lucide-react";

const recoverySteps = [
  {
    icon: CreditCard,
    title: "Retry with the same card",
    text: "Double-check card details, CVV, expiry date, and available balance before trying again.",
  },
  {
    icon: RefreshCw,
    title: "Switch payment method",
    text: "Return to the cart and choose cash on delivery or another supported option if available.",
  },
  {
    icon: ShieldCheck,
    title: "Check bank or network issues",
    text: "Some failures are temporary and can happen because of authentication timeouts or bank-side blocks.",
  },
];

export default function PaymentsFailedPage() {
  return (
    <main className="min-h-screen px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-[40px] bg-[linear-gradient(135deg,#e23744_0%,#f45b67_58%,#ff7f71_100%)] px-6 py-10 text-white shadow-[0_32px_90px_rgba(226,55,68,0.24)] sm:px-8 lg:px-10">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#ffd7db]">
            Payment recovery
          </p>
          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
            What to do when a payment does not go through.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/88">
            Use these steps to recover quickly, retry checkout, or switch to a safer fallback like cash on delivery.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {recoverySteps.map((step) => (
            <article
              key={step.title}
              className="rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff1f2] text-[#e23744]">
                <step.icon size={22} />
              </div>
              <h2 className="mt-4 text-xl font-black text-slate-900">{step.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-500">{step.text}</p>
            </article>
          ))}
        </div>

        <section className="mt-10 rounded-[36px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff1f2] text-[#e23744]">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">Next best action</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
                If retrying online payment still fails, head back to the cart and choose cash on delivery so you can still complete the order.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/cart"
                  className="rounded-full bg-[#e23744] px-5 py-3 text-sm font-black text-white transition hover:bg-[#c91d2a]"
                >
                  Return to cart
                </Link>
                <Link
                  href="/payments"
                  className="rounded-full border border-[#e23744]/20 px-5 py-3 text-sm font-black text-[#e23744] transition hover:bg-[#fff1f2]"
                >
                  Payment options
                </Link>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
