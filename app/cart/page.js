// src/app/cart/page.js
"use client";

import { FaTimes, FaMinus, FaPlus, FaArrowLeft } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../PaymentForm";

// Load your Stripe public key from environment variables
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CartPage() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // Corrected function to get price from the cart item
  const getItemPrice = (item) => {
    // Price from menu item is usually an integer in paise
    const priceFromMenu = item.price / 100 || item.defaultPrice / 100;
    
    // Fallback for cases where price is from the "costForTwo" field, e.g., for a whole restaurant
    const priceFromCostForTwo = item.costForTwo?.match(/\d+/)?.[0] ? parseInt(item.costForTwo.match(/\d+/)[0], 10) : 0;
    
    return priceFromMenu || priceFromCostForTwo;
  };
  
  const subtotal = cartItems.reduce(
    (acc, item) => acc + getItemPrice(item) * (item.quantity || 0),
    0
  );

  const deliveryFee = subtotal >= 500 ? 0 : 50; 
  const taxes = subtotal * 0.05; 
  const finalTotal = subtotal + taxes + deliveryFee - discount;

  const handleApplyPromoCode = () => {
    if (promoCode.toLowerCase() === "foodie30") {
      setDiscount(subtotal * 0.3); 
      alert("Promo code applied!");
    } else {
      setDiscount(0);
      alert("Invalid promo code.");
    }
  };

  const recommendedItems = [
    { id: 'rec-1', name: 'Burger', image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/Autosuggest/Top%20200%20queries/Burger.png", price: 150 },
    { id: 'rec-2', name: 'Fries', image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/hiz39akt5zeht2ys8d8w", price: 90 },
    { id: 'rec-3', name: 'Chicken Wings', image:"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/FOOD_CATALOG/IMAGES/CMS/2025/7/12/c8303418-32bd-454f-84b9-b87d23b53cbf_d2b2c5f0-7419-46e2-9876-64aa51f676b0.jpg", price: 220 },
    { id: 'rec-4', name: 'Cold Coffee', image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/rrlgw7897wioxwninbf5", price: 110 },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-10 lg:p-16 pt-20 font-sans">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-5 md:mb-8">
          <Link
            href="/"
            className="flex items-center text-orange-600 mt-10 font-medium hover:text-orange-700 transition"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Your cart is empty.
            </h2>
            <p className="text-gray-500 text-center max-w-sm">
              Start adding some delicious food to your cart to see it here.
            </p>
            <Link href="/" className="mt-6 w-full md:w-auto px-6 py-3 bg-orange-600 text-center text-white rounded-lg font-semibold hover:bg-orange-700 transition transform hover:scale-105">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">Your Items</h2>
              {cartItems.map((item) => {
                const price = getItemPrice(item);
                
                return (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center bg-white rounded-xl p-4 border border-gray-200 transition duration-300 hover:shadow-md"
                  >
                    {/* Display the restaurant image for the menu item */}
                    <img
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item.cloudinaryImageId}`}
                      alt={item.name}
                      className="w-full sm:w-20 h-32 sm:h-20 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="sm:ml-4 mt-3 sm:mt-0 flex-1 text-gray-800">
                      <h3 className="font-bold text-lg truncate">
                        {item.name}
                      </h3>
                      <p className="font-medium text-sm text-gray-500 mb-1">
                        {/* Display the cuisines, with a fallback */}
                        {item.cuisines?.slice(0, 2).join(", ") || "Cuisine N/A"}
                      </p>
                      <p className="font-semibold text-orange-600">
                        ₹{price}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 mt-4 sm:mt-0">
                      <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition"
                        >
                          <FaMinus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-sm px-3 text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition"
                        >
                          <FaPlus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-500 transition"
                        aria-label={`Remove ${item.name}`}
                      >
                        <FaTimes className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 self-start sticky top-24">
              <h2 className="font-extrabold text-2xl text-gray-800 mb-6 border-b pb-4">
                Order Summary
              </h2>
              <div className="space-y-4 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span className="font-medium">₹{taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-medium text-green-500">
                    {subtotal >= 500 ? "Free" : `₹${deliveryFee}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo Discount</span>
                    <span className="font-medium">-₹{discount.toFixed(2)}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-semibold mb-2 text-gray-700">Have a promo code?</h3>
                <div className="flex flex-col sm:flex-row rounded-lg overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-orange-500 transition-all">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 bg-white text-gray-800 focus:outline-none"
                  />
                  <button
                    onClick={handleApplyPromoCode}
                    className="bg-orange-600 text-white px-4 py-2 sm:py-0 font-semibold hover:bg-orange-700 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div className="flex justify-between border-t border-dashed border-gray-300 pt-6 mt-6">
                <span className="text-xl font-bold text-gray-900">Total</span>
                <span className="text-xl font-bold text-orange-600">₹{finalTotal.toFixed(2)}</span>
              </div>
              
              {showPaymentForm ? (
                <Elements stripe={stripePromise}>
                  <PaymentForm totalAmount={finalTotal} cartItems={cartItems} />
                </Elements>
              ) : (
                <button 
                  onClick={() => setShowPaymentForm(true)}
                  className="mt-8 w-full bg-orange-600 cursor-pointer text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition transform hover:scale-[1.01] shadow-lg"
                >
                  Proceed to Checkout
                </button>
              )}
            </div>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">You might also like...</h2>
            <div className="flex flex-nowrap overflow-x-auto gap-6 pb-4 -mx-6 md:mx-0 px-6 md:px-0 scrollbar-hide">
              {recommendedItems.map(item => (
                <div 
                  key={item.id} 
                  className="flex-shrink-0 w-48 bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 truncate">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">₹{item.price}</p>
                    <button className="mt-3 w-full text-center text-sm font-semibold text-orange-600 border border-orange-200 py-1 rounded-full hover:bg-orange-50 transition">
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}