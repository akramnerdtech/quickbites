"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CircleDashed, CookingPot, House, PackageCheck, Truck } from "lucide-react";
import { getOrderProgress, getStoredOrders } from "../lib/orderStorage";

const progressIcons = [CircleDashed, CookingPot, PackageCheck, Truck, House];

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    setOrders(getStoredOrders());
    const timer = window.setInterval(() => setNow(Date.now()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-[#e23744]/30 hover:text-[#e23744]"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Track your orders</h1>
        </div>

        {orders.length === 0 ? (
          <div className="mt-10 rounded-[36px] border border-slate-200/80 bg-white p-10 text-center shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <h2 className="text-3xl font-black text-slate-900">No orders to track yet</h2>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              Place an order and it will appear here with live progress.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex rounded-full bg-[#e23744] px-6 py-3 text-sm font-black text-white transition hover:bg-[#c91d2a]"
            >
              Start ordering
            </Link>
          </div>
        ) : (
          <div className="mt-10 space-y-6">
            {orders.map((order) => {
              const progress = getOrderProgress(order, now);

              return (
                <article
                  key={order.id}
                  className="rounded-[36px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-8"
                >
                  <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-2xl font-black tracking-tight text-slate-900">
                        Order #{order.id}
                      </h2>
                      <p className="mt-2 text-sm text-slate-500">
                        {new Date(order.createdAt).toLocaleString()} • {order.paymentMethod}
                      </p>
                    </div>
                    <div className="inline-flex items-center rounded-full bg-[#fff1f2] px-4 py-2 text-sm font-black text-[#e23744]">
                      {progress.label}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-5">
                    {progress.steps.map((step, index) => {
                      const Icon = progressIcons[index];
                      const isActive = index <= progress.currentStep;

                      return (
                        <div key={step} className="relative rounded-[24px] p-4">
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                              isActive ? "bg-[#e23744] text-white" : "bg-slate-100 text-slate-400"
                            }`}
                          >
                            <Icon size={18} />
                          </div>
                          <p className={`mt-3 text-sm font-black ${isActive ? "text-slate-900" : "text-slate-400"}`}>
                            {step}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 space-y-3">
                    {order.items.map((item) => (
                      <div key={`${order.id}-${item.id}`} className="flex justify-between gap-4 text-sm">
                        <span className="text-slate-600">
                          {item.name} x {item.quantity}
                        </span>
                        <span className="font-bold text-slate-900">Rs {(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex justify-between border-t border-dashed border-slate-200 pt-5">
                    <span className="text-lg font-black text-slate-900">Total</span>
                    <span className="text-lg font-black text-[#e23744]">
                      Rs {Number(order.total).toFixed(2)}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
