// src/app/restaurant/[id]/page.js
"use client";

import { useCart } from "@/app/context/CartContext";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt, FaPlus } from "react-icons/fa";

// Reusable Star Rating Component
function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.1;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center text-orange-500">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="w-5 h-5" />
      ))}
      {hasHalfStar && <FaStarHalfAlt className="w-5 h-5" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      ))}
      <span className="ml-2 text-gray-700 text-lg font-semibold">
        ({rating.toFixed(1)})
      </span>
    </div>
  );
}

// Corrected MenuItemCard Component
const MenuItemCard = ({ item, restaurantImageId, restaurantCuisines }) => {
  const { addToCart } = useCart();

  if (!item?.card?.info) return null;

  const {
    name,
    description,
    price,
    defaultPrice,
    id,
    isVeg,
  } = item.card.info;

  const handleAddToCart = () => {
    // Pass the restaurant's image and cuisines along with the menu item data
    addToCart({
      id: id,
      name: name,
      price: price || defaultPrice,
      cloudinaryImageId: restaurantImageId,
      cuisines: restaurantCuisines,
      restaurantId: item.card.info.restaurantId,
    });
  };

  return (
    <div className="flex justify-between items-start border-b border-gray-200 py-4 last:border-b-0">
      <div className="flex-1 pr-4">
        <div className="flex items-center">
          <span
            className={`w-3 h-3 rounded-full mr-2 ${
              isVeg ? "bg-green-600" : "bg-red-600"
            }`}
          />
          <h4 className="font-bold text-gray-900 text-lg">{name}</h4>
        </div>
        <p className="text-gray-700 mt-1">₹{(price || defaultPrice) / 100}</p>
        <p className="text-gray-500 text-sm mt-2">{description}</p>
      </div>
      <button
        onClick={handleAddToCart}
        className="bg-orange-500 text-white font-semibold px-4 py-2 cursor-pointer rounded-full hover:bg-orange-600 transition-colors flex items-center gap-2"
      >
        <FaPlus /> Add
      </button>
    </div>
  );
};

const RelatedRestaurantCard = ({ restaurant }) => {
  const { name, cloudinaryImageId, cuisines, avgRating, id } =
    restaurant?.info || restaurant;

  if (!name || !cloudinaryImageId) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer">
      <a href={`/restaurant/${id}`}>
        <img
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
          alt={name}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-900 truncate">{name}</h3>
          <p className="text-sm text-gray-500 truncate mt-1">
            {cuisines?.join(", ")}
          </p>
          <div className="flex items-center mt-3">
            <StarRating rating={parseFloat(avgRating) || 0} />
          </div>
        </div>
      </a>
    </div>
  );
};

const RestaurantDetailPage = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [relatedRestaurants, setRelatedRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pathname = usePathname();
  const id = pathname.split("/").pop();

  useEffect(() => {
    if (!id) return;

    const fetchRestaurantDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=21.99740&lng=79.00110&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`);

        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();

        const restaurantInfoCard = result?.data?.cards?.find(
          (card) => card.card?.card?.info?.name
        );
        const menuCard = result?.data?.cards?.find(
          (card) => card.groupedCard?.cardGroupMap?.REGULAR
        );

        if (restaurantInfoCard) {
          setRestaurant(restaurantInfoCard.card.card.info);
          const cuisines = restaurantInfoCard.card.card.info?.cuisines;
          if (cuisines && cuisines.length > 0) {
            fetchRelatedRestaurants(cuisines[0]);
          }
        }

        if (menuCard) {
          const menuCategories =
            menuCard.groupedCard.cardGroupMap.REGULAR.cards;
          const allItems = [];
          menuCategories.forEach((category) => {
            if (category.card?.card?.itemCards) {
              allItems.push(...category.card.card.itemCards);
            }
          });

          const uniqueItems = Array.from(
            new Map(allItems.map((item) => [item.card.info.id, item])).values()
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
        if (!response.ok) throw new Error("Failed to fetch related restaurants");
        const result = await response.json();
        const relatedItems =
          result?.data?.cards?.[0]?.card?.card?.restaurants || [];

        const uniqueRestaurants = Array.from(
          new Map(
            relatedItems.map((r) => [r.info?.id || r.id, r])
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-red-500">{error}</div>
      </div>
    );
  }

  if (!restaurant) {
    return null;
  }

  const {
    name,
    cloudinaryImageId,
    costForTwoMessage,
    avgRating,
    totalRatingsString,
    locality,
    cuisines,
    sla,
  } = restaurant;

  const placeholderDescription = `This restaurant is a top choice in the area, offering a wide variety of delicious dishes and exceptional service. We pride ourselves on using the freshest ingredients to create a memorable dining experience for every customer.`;

  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <div className="bg-white rounded-3xl mt-10 p-8 md:p-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Column: Image */}
          <div className="flex-1 flex flex-col items-center md:items-start">
            <div className="w-full md:w-3/4 flex items-center justify-center mb-6">
              <img
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
                alt={name}
                className="w-[350px] h-[350px] object-contain rounded-xl"
              />
            </div>
          </div>

          {/* Right Column: Restaurant Details and Actions */}
          <div className="flex-1 flex flex-col">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{name}</h1>
            <p className="text-lg text-gray-600 mb-4">
              {cuisines?.join(", ")}
            </p>

            <div className="flex items-center gap-4 mb-4">
              <StarRating rating={parseFloat(avgRating) || 0} />
              <span className="text-gray-500 text-sm">
                ({totalRatingsString})
              </span>
            </div>

            <div className="flex flex-col mb-6">
              <span className="text-base text-gray-700 font-semibold">
                Cost for two:{" "}
                <span className="text-lg font-bold text-orange-600">
                  {costForTwoMessage}
                </span>
              </span>
              <span className="text-base text-gray-700 font-semibold">
                Delivery time:{" "}
                <span className="text-lg font-bold text-orange-600">
                  {sla?.slaString}
                </span>
              </span>
              <span className="text-base text-gray-700 font-semibold">
                Location:{" "}
                <span className="text-lg font-bold text-orange-600">
                  {locality}
                </span>
              </span>
            </div>

            <div className="mt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {placeholderDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Menu Section */}
        {menuItems.length > 0 && (
          <div className="mt-12">   
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Menu</h2>
            <div className="border border-gray-300 rounded-xl p-4">
              {menuItems.map((item, index) => (
                <MenuItemCard
                  key={`${item.card.info.id}-${index}`}
                  item={item}
                  restaurantImageId={cloudinaryImageId} 
                  restaurantCuisines={cuisines}         
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related Items Section */}
      {relatedRestaurants.length > 0 && (
        <div className="mt-16">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
            Related Restaurants
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {relatedRestaurants.map((relatedItem, index) => (
              <RelatedRestaurantCard
                key={`${relatedItem.info?.id || relatedItem.id}-${index}`}
                restaurant={relatedItem}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );  
};

export default RestaurantDetailPage;