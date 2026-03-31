"use client";

import { useRouter } from "next/navigation";
import { Clock3, ShoppingBag, Star, UtensilsCrossed } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function FoodDetailPage() {
  const router = useRouter();
  const { addToCart } = useCart();

  const featuredItem = {
    id: "featured-paneer-butter-masala",
    name: "Paneer Butter Masala",
    price: 22000,
    cloudinaryImageId: "rvxp5xbniat84r6efku2",
    cuisines: ["North Indian"],
    locality: "QuickBites Kitchen",
  };

  return (
    <main className="min-h-screen px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-[40px] bg-slate-900 p-6 text-white shadow-[0_32px_90px_rgba(15,23,42,0.18)] sm:p-8">
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/rvxp5xbniat84r6efku2"
            alt="Paneer Butter Masala"
            className="h-[340px] w-full rounded-[32px] object-cover"
          />
        </div>

        <div className="mt-8 rounded-[40px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#e23744]">
            Featured dish
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900">
            Paneer Butter Masala
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-500">
            A rich and creamy curry made with soft paneer cubes simmered in a
            tomato-butter gravy. It is one of those comfort dishes that fits the
            updated QuickBites storefront perfectly.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#fff1f2] px-4 py-2 text-sm font-black text-[#e23744]">
              <Star size={16} fill="currentColor" />
              4.5 rating
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-slate-700">
              <Clock3 size={16} />
              30 mins
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-slate-700">
              <UtensilsCrossed size={16} />
              North Indian
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-3xl font-black text-[#e23744]">Rs 220</span>
            <button
              type="button"
              onClick={() => addToCart(featuredItem)}
              className="inline-flex items-center gap-2 rounded-full bg-[#e23744] px-6 py-3 text-sm font-black text-white transition hover:bg-[#c91d2a]"
            >
              <ShoppingBag size={16} />
              Add to cart
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => router.push("/")}
          className="mt-6 text-sm font-black text-[#e23744] transition hover:text-[#c91d2a]"
        >
          Back to home
        </button>
      </section>
    </main>
  );
}
