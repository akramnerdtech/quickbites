
"use client";

import Link from "next/link";
import { FaCheckCircle, FaArrowLeft } from "react-icons/fa";

export default function PaymentSuccessPage() {
  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-10 lg:p-16 pt-20 font-sans flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 w-full max-w-xl text-center border border-gray-200">
        <FaCheckCircle className="text-green-500 text-6xl md:text-8xl mx-auto mb-6 animate-pulse" />
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-gray-600 text-base md:text-lg mb-8 max-w-md mx-auto">
          Thank you for your order. Your delicious food is now being prepared and is on its way!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition transform hover:scale-105 shadow-lg"
          >
            Continue Shopping
          </Link>
          <Link
            href="/my-orders"
            className="w-full sm:w-auto px-6 py-3 text-orange-600 rounded-lg font-semibold border border-orange-200 hover:bg-orange-50 transition transform hover:scale-105"
          >
            Track My Order
          </Link>
        </div>
      </div>
    </div>
  );
}