"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "../context/CartContext";

const curatedCollections = [
  {
    title: "Best breakfast spots",
    subtitle: "22 places",
    image:
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Trending rooftop dining",
    subtitle: "14 places",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Late-night cravings",
    subtitle: "18 places",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80",
  },
];

const useScrollEffect = () => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          if (domRef.current) {
            observer.unobserve(domRef.current);
          }
        }
      },
      { threshold: 0.08 }
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, []);

  return [isVisible, domRef];
};

function RestaurantCard({ resInfo, compact = false }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [buttonState, setButtonState] = useState("idle");

  const handleAddToCartClick = (event) => {
    event.stopPropagation();
    addToCart(resInfo);
    setButtonState("added");
    setTimeout(() => setButtonState("idle"), 1400);
  };

  return (
    <article
      onClick={() => router.push(`/restaurant/${resInfo.id}`)}
      className={`group cursor-pointer overflow-hidden rounded-[28px] border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_70px_rgba(15,23,42,0.12)] ${
        compact ? "shadow-[0_16px_44px_rgba(15,23,42,0.06)]" : "shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
      }`}
    >
      <div className="relative overflow-hidden">
        <img
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${resInfo.cloudinaryImageId}`}
          alt={resInfo.name}
          className={`${compact ? "h-48" : "h-56"} w-full object-cover transition-transform duration-500 group-hover:scale-105`}
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/65 to-transparent px-5 pb-5 pt-12">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
              {resInfo.aggregatedDiscountInfoV3?.header || "Popular"}
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-900">
              {resInfo.costForTwo || "Rs 300 for two"}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-xl font-black tracking-tight text-slate-900">
              {resInfo.name}
            </h3>
            <p className="mt-1 truncate text-sm text-slate-500">
              {resInfo.cuisines?.slice(0, 3).join(", ") || "Cuisine N/A"}
            </p>
          </div>
          <div className="inline-flex items-center gap-1 rounded-full bg-[#24963f] px-3 py-1.5 text-sm font-black text-white">
            <Star size={14} fill="currentColor" />
            {resInfo.avgRating || "4.1"}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-slate-500">
          <span className="flex items-center gap-2">
            <Clock3 size={14} className="text-[#e23744]" />
            {resInfo.sla?.slaString || "30 mins"}
          </span>
          <span className="truncate">{resInfo.locality || "Nearby"}</span>
        </div>

        <button
          onClick={handleAddToCartClick}
          className={`flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-black transition-colors ${
            buttonState === "added"
              ? "bg-[#24963f] text-white"
              : "bg-[#e23744] text-white hover:bg-[#c91d2a]"
          }`}
        >
          <ShoppingBag size={16} />
          {buttonState === "added" ? "Added to cart" : "Add to cart"}
        </button>
      </div>
    </article>
  );
}

const LoadingSkeleton = () => (
  <div className="animate-pulse overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
    <div className="h-56 rounded-[24px] bg-slate-200" />
    <div className="mt-5 h-6 w-2/3 rounded-full bg-slate-200" />
    <div className="mt-3 h-4 w-1/2 rounded-full bg-slate-200" />
    <div className="mt-5 h-12 rounded-full bg-slate-200" />
  </div>
);

export default function Herosection() {
  const [restaurants, setRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [baseRestaurants, setBaseRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [upperTitle, setUpperTitle] = useState("");
  const [restItems, setRestItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [onlineFoodTitle, setOnlineFoodTitle] = useState("");
  const [onlineData, setOnlineData] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const sliderRef = useRef(null);
  const [isVisible, domRef] = useScrollEffect();
  const searchParams = useSearchParams();

  const topRestaurants = useMemo(
    () =>
      [...allRestaurants]
        .sort((a, b) => (parseFloat(b.avgRating) || 0) - (parseFloat(a.avgRating) || 0))
        .slice(0, 4),
    [allRestaurants]
  );

  const foodCategories = useMemo(
    () =>
      restItems.slice(0, 10).map((item) => ({
        ...item,
        normalizedText: item.text.replace(/\s/g, ""),
      })),
    [restItems]
  );

  const fetchData = async () => {
    try {
      setLoading(true);
    const response = await fetch("/.netlify/functions/swiggy");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      const upper = result?.data?.cards?.[0]?.card?.card?.header?.title;
      const restaurantList =
        result?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map(
          (item) => item.info
        ) || [];

      const restItemsData =
        result?.data?.cards?.[0]?.card?.card?.imageGridCards?.info || [];
      const restItemsMapped = restItemsData.map((info) => ({
        id: info.id,
        imageId: info.imageId,
        text: info.accessibility?.altText || "",
      }));

      const onlineTitle = result?.data?.cards?.[2]?.card?.card?.title || "";
      const onlineRestaurantList =
        result?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map(
          (res) => res?.info
        ) || [];

      setUpperTitle(upper || "Inspiration for your first order");
      setRestaurants(restaurantList);
      setAllRestaurants(restaurantList);
      setBaseRestaurants(restaurantList);
      setRestItems(restItemsMapped);
      setOnlineFoodTitle(onlineTitle);
      setOnlineData(onlineRestaurantList);
    } catch (err) {
      console.error("Failed to fetch restaurants:", err);
      setError("Failed to load restaurants. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryRestaurants = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.99740&lng=79.00110&offset=0&page_type=SEE_ALL&collection=${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      const cardWithRestaurants = result?.data?.cards.find(
        (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );

      const mappedRestaurants =
        cardWithRestaurants?.card?.card?.gridElements?.infoWithStyle?.restaurants
          ?.map((item) => item.info)
          .filter(Boolean) || [];

      setRestaurants(mappedRestaurants);
      setAllRestaurants(mappedRestaurants);
      setSearchQuery("");
      setActiveCategory(id);
    } catch (err) {
      console.error("Failed to fetch category restaurants:", err);
      setError("Failed to load restaurants for this category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  useEffect(() => {
    let filteredList = [...allRestaurants];

    if (searchQuery) {
      filteredList = filteredList.filter(
        (res) =>
          res.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          res.cuisines?.some((cuisine) =>
            cuisine.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    setRestaurants(filteredList);
  }, [searchQuery, allRestaurants]);

  const handleCategoryClick = (itemId) => {
    if (activeCategory === itemId) {
      setActiveCategory(null);
      setAllRestaurants(baseRestaurants);
      return;
    }

    fetchCategoryRestaurants(itemId);
  };

  const handleScroll = () => {
    if (!sliderRef.current) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  };

  const scroll = (direction) => {
    if (!sliderRef.current) {
      return;
    }

    const scrollAmount = sliderRef.current.clientWidth * 0.9;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    handleScroll();
  }, [restItems]);

  return (
    <main className="pb-16 pt-24 text-slate-900">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[40px] bg-[linear-gradient(135deg,#e23744_0%,#f85a68_55%,#ff7d66_100%)] px-6 py-10 text-white shadow-[0_34px_90px_rgba(226,55,68,0.28)] sm:px-10 sm:py-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_28%)]" />
          <div className="absolute -right-14 bottom-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/14 px-4 py-2 text-sm font-bold text-white/95 backdrop-blur-sm">
                <Sparkles size={16} />
                Discover restaurants and food like a modern dining guide
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Find the best food and drinks in QuickBites City
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
                Explore top restaurants, browse food categories, and jump into
                highly rated places with a cleaner Zomato-inspired layout.
              </p>

              <div className="mt-8 flex flex-col gap-4 rounded-[30px] bg-white p-4 shadow-2xl sm:flex-row sm:items-center">
                <div className="flex items-center gap-3 rounded-full border border-slate-200 px-4 py-3 text-slate-500 sm:w-64">
                  <MapPin size={18} className="text-[#e23744]" />
                  <span className="truncate text-sm font-semibold text-slate-700">
                    Home, QuickBites City
                  </span>
                </div>
                <label className="relative flex-1">
                  <Search
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    placeholder="Search for restaurant, cuisine or a dish"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="w-full rounded-full border border-slate-200 px-4 py-3 pl-11 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#e23744]"
                    aria-label="Search restaurants"
                  />
                </label>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {curatedCollections.map((collection) => (
                <article
                  key={collection.title}
                  className="group relative overflow-hidden rounded-[28px] border border-white/20 bg-white/10 p-4 backdrop-blur-md"
                >
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="h-44 w-full rounded-[22px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-[22px] bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-12 text-white">
                    <p className="text-xl font-black">{collection.title}</p>
                    <p className="mt-1 text-sm text-white/80">{collection.subtitle}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <section
          ref={domRef}
          className={`mt-12 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#e23744]">
                Food categories
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
                Inspiration for your first order
              </h2>
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <button
                type="button"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={`flex h-11 w-11 items-center justify-center rounded-full border transition ${
                  canScrollLeft
                    ? "border-slate-200 bg-white text-slate-800 hover:border-[#e23744] hover:text-[#e23744]"
                    : "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300"
                }`}
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={`flex h-11 w-11 items-center justify-center rounded-full border transition ${
                  canScrollRight
                    ? "border-slate-200 bg-white text-slate-800 hover:border-[#e23744] hover:text-[#e23744]"
                    : "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300"
                }`}
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className="scrollbar-hide mt-8 flex gap-5 overflow-x-auto pb-2"
          >
            {foodCategories.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleCategoryClick(item.id)}
                className={`group flex-none rounded-[28px] border bg-white p-3 text-left shadow-[0_16px_44px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 ${
                  activeCategory === item.id
                    ? "border-[#e23744] ring-2 ring-[#e23744]/12"
                    : "border-slate-200 hover:border-[#e23744]/30"
                }`}
              >
                <div className="h-40 w-40 overflow-hidden rounded-[22px] bg-[#fff1f2]">
                  <img
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`}
                    alt={item.text}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="px-2 pb-1 pt-4 text-base font-black text-slate-900">
                  {item.text}
                </p>
              </button>
            ))}
          </div>
        </section>

        {topRestaurants.length > 0 && (
          <section className="mt-14">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#e23744]">
                  Top restaurants
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
                  Best places to eat in your city
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-slate-500">
                Highly rated spots picked from the live feed, presented with a
                cleaner dining-guide style layout.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {topRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} resInfo={restaurant} compact />
              ))}
            </div>
          </section>
        )}

        <section className="mt-14 rounded-[36px] border border-slate-200 bg-[linear-gradient(180deg,#fff7f7_0%,#ffffff_100%)] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.05)] sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#e23744]">
            Collections
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
            Curated for every plan
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Whether you are stepping out or ordering in, here are a few styled
            collections to make the homepage feel more like Zomato.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {curatedCollections.map((collection) => (
              <article
                key={collection.title}
                className="group relative overflow-hidden rounded-[28px] shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
              >
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="text-2xl font-black">{collection.title}</h3>
                  <p className="mt-1 text-sm text-white/80">{collection.subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#e23744]">
                Delivery restaurants
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
                Order food online
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-500">
              Browse restaurants with delivery, offers, ratings, and fast arrival
              times in one place.
            </p>
          </div>

          {loading ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {[...Array(8)].map((_, index) => (
                <LoadingSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="mt-8 rounded-[28px] border border-red-100 bg-red-50 px-6 py-8 text-center text-red-600">
              {error}
            </div>
          ) : restaurants.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {restaurants.map((res) => (
                <RestaurantCard key={res.id} resInfo={res} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-[32px] border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
              <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#fff1f2] text-[#e23744]">
                <Search size={30} />
              </div>
              <h3 className="mt-5 text-2xl font-black text-slate-900">No results found</h3>
              <p className="mt-2 text-slate-500">
                Try another restaurant name, food category, or dish.
              </p>
            </div>
          )}
        </section>

        {onlineData.length > 0 && (
          <section className="mt-14">
            <div className="rounded-[36px] bg-slate-900 px-6 py-8 text-white shadow-[0_28px_80px_rgba(15,23,42,0.18)] sm:px-8">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#f7a0a7]">
                More places to try
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">
                {onlineFoodTitle || upperTitle || "Restaurants you may like"}
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {onlineData.map((res) => (
                <RestaurantCard key={res.id} resInfo={res} compact />
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
