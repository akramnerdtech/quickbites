"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Clock3, ShoppingBag, Star } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

function MenuItemCard({ item, restaurantImageId, restaurantCuisines }) {
  const { addToCart } = useCart();

  if (!item?.card?.info) {
    return null;
  }

  const { name, description, price, defaultPrice, id, isVeg } = item.card.info;

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price: price || defaultPrice,
      cloudinaryImageId: restaurantImageId,
      cuisines: restaurantCuisines,
      restaurantId: item.card.info.restaurantId,
    });
  };

  return (
    <article className="flex flex-col gap-5 rounded-[28px] border border-slate-200/80 bg-white p-5 shadow-sm sm:flex-row sm:items-start sm:justify-between">
      <div className="max-w-2xl">
        <div className="flex items-center gap-3">
          <span className={`h-3.5 w-3.5 rounded-full ${isVeg ? "bg-[#1ba672]" : "bg-red-500"}`} />
          <h3 className="text-xl font-black tracking-tight text-slate-900">{name}</h3>
        </div>
        <p className="mt-3 text-lg font-black text-[#e23744]">Rs {((price || defaultPrice) ?? 0) / 100}</p>
        <p className="mt-3 text-sm leading-7 text-slate-500">{description || "Freshly prepared and delivered fast."}</p>
      </div>
      <button
        type="button"
        onClick={handleAddToCart}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#e23744] px-5 py-3 text-sm font-black text-white transition hover:bg-[#c91d2a]"
      >
        <ShoppingBag size={16} />
        Add
      </button>
    </article>
  );
}

function RelatedRestaurantCard({ restaurant }) {
  const { name, cloudinaryImageId, cuisines, avgRating, id } = restaurant?.info || restaurant;

  if (!name || !cloudinaryImageId) {
    return null;
  }

  return (
    <Link
      href={`/restaurant/${id}`}
      className="overflow-hidden rounded-[30px] border border-slate-200/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition hover:-translate-y-1"
    >
      <img
        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
        alt={name}
        className="h-44 w-full object-cover"
      />
      <div className="p-5">
        <h3 className="truncate text-xl font-black text-slate-900">{name}</h3>
        <p className="mt-2 truncate text-sm text-slate-500">{cuisines?.join(", ")}</p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#fff1f2] px-3 py-2 text-sm font-black text-[#e23744]">
          <Star size={14} fill="currentColor" />
          {parseFloat(avgRating) || 0}
        </div>
      </div>
    </Link>
  );
}

export default function RestaurantDetailPage() {
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [relatedRestaurants, setRelatedRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchRestaurantDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/restaurant/${id}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        const restaurantInfoCard = result?.data?.cards?.find((card) => card.card?.card?.info?.name);
        const menuCard = result?.data?.cards?.find((card) => card.groupedCard?.cardGroupMap?.REGULAR);

        if (restaurantInfoCard) {
          setRestaurant(restaurantInfoCard.card.card.info);
          const cuisines = restaurantInfoCard.card.card.info?.cuisines;
          if (cuisines?.length) {
            fetchRelatedRestaurants(cuisines[0]);
          }
        }

        if (menuCard) {
          const menuCategories = menuCard.groupedCard.cardGroupMap.REGULAR.cards;
          const allItems = [];

          menuCategories.forEach((category) => {
            if (category.card?.card?.itemCards) {
              allItems.push(...category.card.card.itemCards);
            }
          });

          const uniqueItems = Array.from(
            new Map(allItems.map((menuItem) => [menuItem.card.info.id, menuItem])).values()
          );

          setMenuItems(uniqueItems);
        } else {
          setMenuItems([]);
        }
      } catch (err) {
        console.error("Failed to fetch restaurant details:", err);
        setError("Failed to load restaurant details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedRestaurants = async (cuisineType) => {
      try {
        const response = await fetch(
          `https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.99740&lng=79.00110&offset=0&page_type=SEE_ALL&collection=83637&tags=${cuisineType}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch related restaurants");
        }

        const result = await response.json();
        const relatedItems = result?.data?.cards?.[0]?.card?.card?.restaurants || [];
        const uniqueRestaurants = Array.from(
          new Map(
            relatedItems.map((restaurantItem) => [restaurantItem.info?.id || restaurantItem.id, restaurantItem])
          ).values()
        );

        setRelatedRestaurants(
          uniqueRestaurants
            .filter((item) => item.info?.id !== id && item.info?.cloudinaryImageId)
            .slice(0, 4)
        );
      } catch (err) {
        console.error("Failed to fetch related restaurants:", err);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[36px] bg-white p-10 text-center shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <p className="text-lg font-bold text-slate-500">Loading restaurant...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[36px] bg-red-50 p-10 text-center text-red-600">
          {error}
        </div>
      </main>
    );
  }

  if (!restaurant) {
    return null;
  }

  const { name, cloudinaryImageId, costForTwoMessage, avgRating, totalRatingsString, locality, cuisines, sla } =
    restaurant;

  return (
    <main className="min-h-screen px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="overflow-hidden rounded-[40px] bg-slate-900 p-6 text-white shadow-[0_32px_90px_rgba(15,23,42,0.18)] sm:p-8">
            <img
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
              alt={name}
              className="h-[320px] w-full rounded-[32px] object-cover"
            />
          </div>

          <div className="rounded-[40px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#e23744]">
              Restaurant details
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900">{name}</h1>
            <p className="mt-3 text-base text-slate-500">{cuisines?.join(", ")}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#fff1f2] px-4 py-2 text-sm font-black text-[#e23744]">
                <Star size={16} fill="currentColor" />
                {parseFloat(avgRating) || 0} • {totalRatingsString}
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-slate-700">
                <Clock3 size={16} />
                {sla?.slaString}
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] bg-slate-50 p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Cost for two</p>
                <p className="mt-2 text-lg font-black text-slate-900">{costForTwoMessage}</p>
              </div>
              <div className="rounded-[28px] bg-slate-50 p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Locality</p>
                <p className="mt-2 text-lg font-black text-slate-900">{locality}</p>
              </div>
            </div>

            <p className="mt-8 text-sm leading-7 text-slate-500">
              This restaurant is a strong choice in the area, with a wide menu,
              dependable delivery, and familiar dishes surfaced through the new
              QuickBites storefront.
            </p>
          </div>
        </div>

        {menuItems.length > 0 && (
          <section className="mt-12">
            <h2 className="text-3xl font-black tracking-tight text-slate-900">Menu</h2>
            <div className="mt-6 space-y-4">
              {menuItems.map((item, index) => (
                <MenuItemCard
                  key={`${item.card.info.id}-${index}`}
                  item={item}
                  restaurantImageId={cloudinaryImageId}
                  restaurantCuisines={cuisines}
                />
              ))}
            </div>
          </section>
        )}

        {relatedRestaurants.length > 0 && (
          <section className="mt-14">
            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              Related restaurants
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {relatedRestaurants.map((relatedItem, index) => (
                <RelatedRestaurantCard
                  key={`${relatedItem.info?.id || relatedItem.id}-${index}`}
                  restaurant={relatedItem}
                />
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
