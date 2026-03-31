"use client";

import React, { useEffect, useState } from "react";
import { DollarSign, Gift, Percent, ShoppingBag, Tag, Ticket } from "lucide-react";

const dummyOffers = [
  {
    id: "offer1",
    icon: "Percent",
    title: "Flat 50% OFF",
    description: "Get a straight 50% discount on all orders above Rs 1149.",
    code: "QUICK50",
    terms: "Valid for first-time users. Max discount Rs 100.",
  },
  {
    id: "offer2",
    icon: "DollarSign",
    title: "Free Delivery",
    description: "Enjoy zero delivery fees on orders over Rs 199.",
    code: "FREEDEL",
    terms: "Valid for a limited period. Check app for details.",
  },
  {
    id: "offer3",
    icon: "Gift",
    title: "Buy One, Get One",
    description: "Order any pizza and get another one absolutely free.",
    code: "BOGOPIZZA",
    terms: "Applicable on selected restaurants only.",
  },
  {
    id: "offer4",
    icon: "ShoppingBag",
    title: "Weekend Bonanza",
    description: "20% off on all weekend orders across select restaurants.",
    code: "WEEKEND20",
    terms: "Offer valid on Saturday and Sunday only.",
  },
  {
    id: "offer5",
    icon: "Tag",
    title: "Mega Cashback",
    description: "Get 30% cashback on your next 3 orders.",
    code: "MEGA30",
    terms: "Cashback credited to your QuickBites wallet.",
  },
];

const iconMap = {
  Percent: <Percent size={24} />,
  DollarSign: <DollarSign size={24} />,
  Gift: <Gift size={24} />,
  ShoppingBag: <ShoppingBag size={24} />,
  Tag: <Tag size={24} />,
};

function OfferCard({ offer }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(offer.code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1600);
  };

  return (
    <article className="rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e23744] text-white shadow-[0_16px_40px_rgba(226,55,68,0.22)]">
          {iconMap[offer.icon]}
        </div>
        <span className="rounded-full bg-[#fff1f2] px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#e23744]">
          Limited offer
        </span>
      </div>

      <h3 className="mt-6 text-2xl font-black tracking-tight text-slate-900">
        {offer.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-500">{offer.description}</p>

      <div className="mt-6 rounded-[24px] border border-dashed border-[#f6b2b8] bg-[#fff6f7] p-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
          Coupon code
        </p>
        <div className="mt-2 flex items-center justify-between gap-4">
          <span className="text-lg font-black tracking-[0.16em] text-[#e23744]">
            {offer.code}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className={`rounded-full px-4 py-2 text-sm font-bold text-white transition ${
              isCopied ? "bg-[#24963f]" : "bg-[#e23744] hover:bg-[#c91d2a]"
            }`}
          >
            {isCopied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-500">{offer.terms}</p>
    </article>
  );
}

export default function OffersPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRealOffers = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://www.swiggy.com/dapi/cart");

        if (!response.ok) {
          throw new Error("Failed to fetch offers");
        }

        const result = await response.json();
        const realOffersData = result?.data?.cards
          ?.filter((card) => card.card?.card?.gridElements?.infoWithStyle?.offers)
          .map((card) => card.card.card.gridElements.infoWithStyle.offers)
          .flat();

        if (realOffersData?.length) {
          const formattedOffers = realOffersData.map((item) => ({
            id: item.info.offerIds[0],
            icon: item.info.offerId.includes("PERCENT")
              ? "Percent"
              : item.info.offerId.includes("DELIVERY")
              ? "ShoppingBag"
              : "Tag",
            title: item.info.header,
            description: item.info.couponCode,
            code: item.info.couponCode,
            terms: item.info.description,
          }));
          setOffers(formattedOffers);
        } else {
          setOffers(dummyOffers);
        }
      } catch (error) {
        console.error("Error fetching offers:", error);
        setOffers(dummyOffers);
      } finally {
        setLoading(false);
      }
    };

    fetchRealOffers();
  }, []);

  return (
    <main className="min-h-screen px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[40px] bg-[linear-gradient(135deg,#e23744_0%,#f45b67_58%,#ff7f71_100%)] px-6 py-10 text-white shadow-[0_32px_90px_rgba(226,55,68,0.24)] sm:px-8 lg:px-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#ffd7db]">
            <Ticket size={16} />
            Offers and rewards
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Hot deals for every craving, checkout, and late-night order.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            Claim coupon codes, free delivery offers, and limited campaigns built
            into the same red-first QuickBites experience.
          </p>
        </div>

        {loading ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="h-72 animate-pulse rounded-[32px] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.06)]"
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {offers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
