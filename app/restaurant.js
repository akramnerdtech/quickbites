"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react"
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";


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
      <span className="ml-2 text-gray-700 text-lg font-semibold">({rating.toFixed(1)})</span>
    </div>
  );
}

const RestaurantDetailPage = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pathname = usePathname()
  const id = pathname.split('/').pop();

  useEffect(() => {
    if (!id) return;

    const fetchRestaurantDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://www.swiggy.com/dapi/menu/v4/full?lat=21.99740&lng=79.00110&menuId=${id}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        
        // Assuming the restaurant info is located here in the API response
        const restaurantData = result?.data;
        if (restaurantData) {
          setRestaurant(restaurantData);
        } else {
          setError("Restaurant not found.");
        }
      } catch (err) {
        console.error("Failed to fetch restaurant details:", err);
        setError("Failed to load restaurant details. Please try again.");
      } finally {
        setLoading(false);
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

  const { name, cloudinaryImageId, costForTwoMessage, avgRating, totalRatingsString, locality, cuisines, sla } = restaurant?.data?.cards[0]?.card?.card?.info || {};

  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <img
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
            alt={name}
            className="w-full md:w-1/3 h-auto object-cover rounded-2xl shadow-lg"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{name}</h1>
            <p className="text-lg text-gray-600 mb-4">{cuisines?.join(", ")}</p>
            <div className="flex items-center gap-4 mb-4">
              <StarRating rating={parseFloat(avgRating) || 0} />
              <span className="text-gray-500 text-sm">{totalRatingsString}</span>
            </div>
            <p className="text-gray-700 text-base mb-2">
              <span className="font-semibold">Cost for two:</span> {costForTwoMessage}
            </p>
            <p className="text-gray-700 text-base mb-2">
              <span className="font-semibold">Delivery Time:</span> {sla?.deliveryTime} mins
            </p>
            <p className="text-gray-700 text-base mb-6">
              <span className="font-semibold">Location:</span> {locality}
            </p>
            
            {/* Add more details here like menu items */}
            <h2 className="text-2xl font-bold mt-8 mb-4">Menu</h2>
            {/* You would map through the menu items from the API response here */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Example static menu item */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Item Name</h3>
                <p className="text-gray-600">Description of the food item.</p>
                <span className="text-orange-600 font-bold mt-2 block">$10.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;