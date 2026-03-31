"use client";

import { useRouter } from "next/navigation";
import { Award, ChefHat, Heart, Rocket, Utensils } from "lucide-react";

const valueCards = [
  {
    icon: ChefHat,
    title: "Curated quality",
    text: "We spotlight restaurants that people return to, not just places that fill a list.",
  },
  {
    icon: Rocket,
    title: "Fast delivery",
    text: "Reliable timing, clear order flow, and fewer steps from craving to checkout.",
  },
  {
    icon: Heart,
    title: "Customer first",
    text: "We shape the product around reassurance, speed, and a smoother meal experience.",
  },
];

export default function About() {
  const router = useRouter();

  return (
    <main className="min-h-screen px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[40px] bg-slate-900 px-6 py-10 text-white shadow-[0_32px_90px_rgba(15,23,42,0.18)] sm:px-8 lg:px-10">
            <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#ffb38d]">
              About QuickBites
            </p>
            <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              A food delivery brand built around speed, appetite, and clarity.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
              QuickBites is designed to feel immediate and confident, pairing bold
              discovery with a cleaner path to the food people already know they want.
            </p>
          </div>

          <div className="rounded-[40px] border border-[#ffd7c5] bg-[linear-gradient(135deg,#fff1e8_0%,#ffffff_72%)] p-8 shadow-[0_28px_80px_rgba(255,82,0,0.12)]">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff5200] text-white">
                <Utensils size={26} />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ff5200]">
                  Our mission
                </p>
                <h2 className="text-2xl font-black text-slate-900">
                  Make food ordering feel effortless.
                </h2>
              </div>
            </div>
            <p className="mt-5 text-base leading-7 text-slate-600">
              We connect hungry users with dependable restaurants through a storefront
              that feels lively, fast, and easy to trust at every step.
            </p>

            <div className="mt-8 rounded-[28px] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Award className="text-[#ff5200]" size={24} />
                <h3 className="text-xl font-black text-slate-900">Our philosophy</h3>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                Strong visuals should support fast decisions. Good food apps reduce
                hesitation, surface trust signals quickly, and help people order with
                confidence.
              </p>
            </div>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            The values that guide us
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {valueCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff1e8] text-[#ff5200]">
                  <card.icon size={26} />
                </div>
                <h3 className="mt-5 text-2xl font-black tracking-tight text-slate-900">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-[40px] bg-[#ff5200] px-6 py-10 text-white shadow-[0_28px_80px_rgba(255,82,0,0.28)] sm:px-8">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Ready to try the new QuickBites flow?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/88">
            Explore restaurants, compare delivery times, and order through the updated
            experience.
          </p>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-black text-[#ff5200] transition hover:bg-slate-100"
          >
            Start ordering
          </button>
        </section>
      </section>
    </main>
  );
}
