// src/app/Herosection.js
"use client";

import React, { useEffect, useState, useRef } from "react";
import { FaFire, FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

// Function to handle scroll-based fade-in effect
const useScrollEffect = () => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.unobserve(domRef.current);
      }
    }, {
      threshold: 0.1
    });

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


function RatingDetails({ rating, totalRatings }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.1;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center text-green-500">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="w-4 h-4" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="w-4 h-4" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
        ))}
      </div>
      <span className="text-sm text-gray-500">
        ({totalRatings || "0"})
      </span>
    </div>
  );
}


// New RestaurantCard component defined here
function RestaurantCard({ resInfo }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [buttonState, setButtonState] = useState("idle");

  const getDiscountInfo = (restaurant) => {
    const offers = restaurant.aggregatedDiscountInfoV3?.dsco;
    const header = restaurant.aggregatedDiscountInfoV3?.header;
    const subHeader = restaurant.aggregatedDiscountInfoV3?.subHeader;

    if (header && subHeader) {
      return `${header} ${subHeader}`;
    } else if (header) {
      return header;
    } else if (offers) {
      return `${offers} OFF`;
    }
    return null;
  };

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    addToCart(resInfo);
    setButtonState("added");
    setTimeout(() => {
      setButtonState("idle");
    }, 1500);
  };

  const discount = getDiscountInfo(resInfo);

  return (
    <div
      onClick={() => router.push(`/restaurant/${resInfo.id}`)}
      className="bg-white rounded-2xl shadow-lg transform transition duration-300 hover:scale-[1.03] hover:shadow-2xl cursor-pointer overflow-hidden relative"
    >
      <div className="relative">
        <img
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${resInfo.cloudinaryImageId}`}
          alt={resInfo.name}
          className="w-full h-48 object-cover rounded-t-2xl"
        />
        {discount && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4">
            <h4 className="text-xl font-extrabold text-white">
              {discount}
            </h4>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-center mb-2">
          <RatingDetails
            rating={parseFloat(resInfo.avgRating) || 0}
            totalRatings={resInfo.totalRatingsString}
          />
          <p className="text-sm font-semibold text-gray-500">{resInfo.locality}</p>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mt-5 truncate mb-1">
          {resInfo.name}
        </h3>
        <p className="text-sm text-gray-600 truncate mb-4 -mt-2">
          {resInfo.cuisines?.slice(0, 2).join(", ") || "Cuisine N/A"}
        </p>
        
        <div className="mt-2 absolute flex justify-between items-center pt-3">
          <span className="text-sm font-semibold text-black">
            {resInfo.costForTwo}
          </span>
          <span className="text-sm text-gray-600 flex items-center">
            <FaFire className="text-orange-500 mr-1" />
            {resInfo.sla?.slaString || "N/A"}
          </span>
        </div>

        <button
          onClick={handleAddToCartClick}
          className={`mt-4 w-full py-3 rounded-full font-bold cursor-pointer shadow-lg transition-colors duration-300
            ${buttonState === 'added'
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-orange-600 text-white hover:bg-orange-700'
            }`}
        >
          {buttonState === 'added' ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}


const LoadingSkeleton = () => (
  <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-5 flex flex-col h-full animate-pulse">
    <div className="h-44 w-full bg-gray-200 rounded-2xl mb-4"></div>
    <div className="h-6 w-3/4 bg-gray-200 rounded-md mb-2"></div>
    <div className="h-4 w-1/2 bg-gray-200 rounded-md mb-3"></div>
    <div className="flex justify-between items-center mb-3">
      <div className="h-4 w-1/4 bg-gray-200 rounded-md"></div>
      <div className="h-4 w-1/5 bg-gray-200 rounded-md"></div>
    </div>
    <div className="h-4 w-full bg-gray-200 rounded-md mb-3"></div>
    <div className="h-8 w-full bg-gray-200 rounded-full mt-auto"></div>
  </div>
);

export default function Herosection() {
  const [restaurants, setRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [upperTitle, setUpperTitle] = useState("");
  const [restItems, setRestItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("relevance");
  const [activeFilter, setActiveFilter] = useState(null);
  const [onlineFoodTitle, setOnlineFoodTitle]= useState("")
  const [onlineData, setOnlineData]= useState([])


  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  


  const [isVisible, domRef] = useScrollEffect();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.99740&lng=79.00110&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();

      const upper = result?.data?.cards?.[0]?.card?.card?.header?.title;
      const restaurantList =
        result?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants?.map(item => item.info) || [];
          
      const restItemsData =
        result?.data?.cards?.[0]?.card?.card?.imageGridCards?.info || [];
      const restItemsMapped = restItemsData.map((info) => ({
        id: info.id,
        imageId: info.imageId,
        text: info.accessibility?.altText || "",
      }));


    

      // const onlinRestaurantList = result?.data.cards?.[4]?.card?.card?.gridElements?.restaurants[0]?.info?.name

      // const onlineTitle = result?.data?.cards?.[2]?.card?.card?.title || []
      // setOnlineFoodTitle(onlineTitle || "")
      // console.log("online title is : ", onlineTitle)
 
  //     setOnlineData(onlinRestaurantList);
  //  console.log("online food deliver restaurant is:", onlinRestaurantList)

      setUpperTitle(upper || "");
      setRestaurants(restaurantList);
      setAllRestaurants(restaurantList);
      setRestItems(restItemsMapped);
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
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();

      const cardWithRestaurants = result?.data?.cards.find(
        card => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );
      
      const newRestaurants = cardWithRestaurants?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
      
      
      const mappedRestaurants = newRestaurants
        .map(item => item.info) 
        .filter(info => info); 

      setRestaurants(mappedRestaurants);
      setAllRestaurants(mappedRestaurants); 
      setSearchQuery("");
      setSortOption("relevance");
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

  const handleFilterAndSort = () => {
    let filteredList = [...allRestaurants];

    if (searchQuery) {
      filteredList = filteredList.filter(
        (res) =>
          res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          res.cuisines?.some((cuisine) =>
            cuisine.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    if (activeFilter) {
      filteredList = filteredList.filter((res) =>
        res.cuisines?.some((cuisine) =>
          cuisine.toLowerCase().includes(activeFilter.toLowerCase())
        )
      );
    }

    if (sortOption === "rating") {
      filteredList.sort(
        (a, b) => (b.avgRating || 0) - (a.avgRating || 0)
      );
    } else if (sortOption === "deliveryTime") {
      filteredList.sort(
        (a, b) =>
          (a.sla?.deliveryTime || 999) - (b.sla?.deliveryTime || 999)
      );
    }
    setRestaurants(filteredList);
  };

  useEffect(() => {
    handleFilterAndSort();
  }, [searchQuery, sortOption, activeFilter, allRestaurants]);

  const handleCategoryClick = (itemId, categoryText) => {
    const newActiveFilter = activeFilter === categoryText ? null : categoryText;
    setActiveFilter(newActiveFilter);
    setSearchQuery("");
    
    if (newActiveFilter) {
      fetchCategoryRestaurants(itemId);
    } else {
      fetchData(); 
    }
  };

  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };  

   
  const scroll = (direction) => { 
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth;
      if (direction === "left") {
        sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      handleScroll();
    }
  }, [restItems]);

  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans antialiased">
      <div className="container mx-auto px-6 py-12 md:py-20">

        <div className="mb-16">
          <h1 className="text-3xl md:text-4xl mt-6 font-extrabold text-gray-900 mb-4">
            Delicious food, <br /> delivered to your doorstep.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8">
            Explore a wide range of restaurants and cuisines near you.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search for restaurants..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setActiveFilter(null);
                }}
                className="w-full py-3 px-6 pl-12 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                aria-label="Search restaurants"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <div className="relative w-full md:w-1/4">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full py-3 px-6 pl-12 pr-10 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none transition-all duration-300"
                aria-label="Sort options"
              >
                <option value="relevance">Relevance</option>
                <option value="rating">Rating</option>
                <option value="deliveryTime">Delivery Time</option>
              </select>
              <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
        </div>

        {upperTitle && restItems.length > 0 && (
          <div ref={domRef} className={`relative pt-12 pb-12 transition-all duration-1000 hidden  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <h2 className="text-3xl font-bold mb-6 ">{upperTitle}</h2>
            <div
              ref={sliderRef}
              onScroll={handleScroll}
              className="flex overflow-x-scroll gap-[25.2px] pb-12 scrollbar-hide"
            >
              {restItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleCategoryClick(item.id, item.text.replace(/\s/g, ""))}
                  className={`flex-none w-40 h-50 transform transition-all duration-300 hover:scale-105 cursor-pointer ${activeFilter === item.text.replace(/\s/g, "")
                      ? "ring-2 ring-orange-500 ring-offset-2 rounded-xl"
                      : ""
                    }`}
                >
                  <img
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`}
                    alt={item.text}
                    className="w-full h-full object-cover rounded-xl shadow-lg"
                  />
                  {/* <p className="mt-2 text-center text-sm font-medium text-gray-700 truncate">
                    {item.text}
                  </p> */}
                </div>
              ))}
            </div>

            <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between px-2">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={`p-2 bg-white rounded-full cursor-pointer -ml-22 shadow-md transition-all duration-300 ${canScrollLeft ? 'opacity-100 hover:scale-110' : 'opacity-0 cursor-not-allowed'
                  }`}
                aria-label="Previous"
              >
                <ChevronLeft className="text-gray-600" size={24} />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={`p-2 bg-white rounded-full cursor-pointer -mr-12 shadow-md transition-all duration-300 ${canScrollRight ? 'opacity-100 hover:scale-110' : 'opacity-0 cursor-not-allowed'
                  }`}
                aria-label="Next"
              >
                <ChevronRight className="text-gray-600" size={24} />
              </button>
            </div>
          </div>
        )}

        {/* Main Restaurants Section with Scroll Effect */}
        <div ref={domRef} className={`-mt-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <h2 className="text-3xl font-extrabold mb-8 tracking-wide">
            Restaurants near you
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <LoadingSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-500 text-lg">{error}</div>
          ) : restaurants.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {restaurants.map((res) => (
                <RestaurantCard key={res.id} resInfo={res} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-gray-100 p-8 rounded-full inline-block mb-4">
                <Search className="text-gray-400" size={48} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">Try adjusting your search or filter settings.</p>
            </div>
          )}
        </div>

         <div className="font-bold text-3xl mt-10">{onlineFoodTitle}</div>
      </div>

     
    </div>
  );
}