"use client";

import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import { DollarSign, Percent, Gift, ShoppingBag, Tag } from "lucide-react";

const dummyOffers = [
{
id: "offer1",
    icon: "Percent",
    title: "Flat 50% OFF",
    description: "Get a straight 50% discount on all orders above ₹1149.",
    code: "QUICK50",
    terms: "Valid for first-time users. Max discount ₹100.",
  },
  {
    id: "offer2",
    icon: "DollarSign",
    title: "Free Delivery",
    description: "Enjoy zero delivery fees on orders over ₹199.",
    code: "FREEDEL",
    terms: "Valid for a limited period. Check app for details.",
  },
  {
    id: "offer3",
    icon: "Gift",
    title: "Buy One, Get One",
    description: "Order any pizza and get another one absolutely free!",
    code: "BOGOPIZZA",
    terms: "Applicable on selected restaurants only.",
  },
  {
    id: "offer4",
    icon: "ShoppingBag",
    title: "Weekend Bonanza",
    description: "20% OFF on all weekend orders. Savor your favorites!",
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
  Percent: <Percent size={28} />,
  DollarSign: <DollarSign size={28} />,
  Gift: <Gift size={28} />,
  ShoppingBag: <ShoppingBag size={28} />,
  Tag: <Tag size={28} />,
};


const OfferCard = ({ offer }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(offer.code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); 
   
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
      <div className="flex items-center mb-4">
        <div className="p-3 bg-orange-500 rounded-full text-white">
          {iconMap[offer.icon]}
        </div>
        <div className="ml-4">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800">{offer.title}</h3>
        </div>
      </div>
      <p className="text-gray-600 mb-4">{offer.description}</p>
      
      <div className="mt-auto">
        <div className="flex justify-between items-center bg-orange-50 border border-dashed border-orange-200 rounded-lg p-3">
          <span className="text-sm md:text-lg font-mono tracking-wider text-orange-700 font-semibold">
            {offer.code}
          </span>
          <button 
            onClick={handleCopy}
            className={`text-sm font-semibold text-white cursor-pointer  px-4 py-2 rounded-full transition-colors duration-300 ${isCopied ? "bg-green-500" : "bg-orange-600 hover:bg-orange-700"}`}
          >
            {isCopied ? "Copied!" : "Copy" }
          
          </button>
        </div>
      

        <p className="text-xs text-gray-500 mt-2">{offer.terms}</p>
      </div>
    </div>
  );
}

export default function OffersPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchRealOffers = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://www.swiggy.com/dapi/cart');
        
        if (!response.ok) {
          throw new Error("Failed to fetch offers");
        }
        
        const result = await response.json();
        

        const realOffersData = result?.data?.cards?.filter(card => card.card?.card?.gridElements?.infoWithStyle?.offers)
          .map(card => card.card.card.gridElements.infoWithStyle.offers)
          .flat();

        if (realOffersData && realOffersData.length > 0) {
      
          const formattedOffers = realOffersData.map(item => ({
            id: item.info.offerIds[0],
            icon: item.info.offerId.includes('PERCENT') ? 'Percent' :
                  item.info.offerId.includes('DELIVERY') ? 'ShoppingBag' :
                  'Tag',
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
    <>
      <Header />
      <div className="bg-white text-gray-800 min-h-screen pt-24 pb-12 px-6 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600">
                Hot Deals Just For You!
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Discover amazing discounts and special promotions on your favorite meals and restaurants.
            </p>
          </div>

          {/* Offers Grid */}
          {loading ? (
            <div className="text-center text-lg text-orange-600 animate-pulse">
              Loading delicious deals...
            </div>
          ) : offers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {offers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          ) : (
            <div className="text-center text-lg text-gray-600">
              No sizzling offers available right now. Check back soon!
            </div>
          )}
        </div>
      </div>
    </>
  );
}