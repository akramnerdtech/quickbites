"use client";

import { useRouter } from "next/navigation";
import { ChefHat, Rocket, Heart, Utensils, Award } from "lucide-react";
import Header from "../header/Header";

export default function About() {
  const router = useRouter();

  return (
    <>
      <Header />
      <div className="bg-white text-gray-800 min-h-screen pt-24 pb-12 px-6 font-sans">
        {/* Hero Section */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl p-2 font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600 mb-6 drop-shadow-md">
            The Story Behind QuickBites
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
            We're not just a food delivery service; we're a community of food lovers passionate about making every meal a celebration.
          </p>
        </div>

        {/* Our Mission & Philosophy Section - Grid-based layout */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Mission Statement */}
            <div className="bg-gray-100 p-12 rounded-3xl shadow-inner border border-gray-200">
              <div className="flex items-center mb-4">
                <Utensils size={36} className="text-orange-600 mr-4" />
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our mission is to seamlessly connect you with an array of culinary experiences, from local hidden gems to your favorite comfort foods. We strive to provide a fast, reliable, and delightful food journey, from the moment you place your order to the first delicious bite.
              </p>
            </div>
            
            {/* Our Philosophy */}
            <div className="bg-gray-100 p-12 rounded-3xl shadow-inner border border-gray-200">
              <div className="flex items-center mb-4">
                <Award size={36} className="text-red-600 mr-4" />
                <h2 className="text-3xl font-bold text-gray-900">Our Philosophy</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                We believe in the power of good food to bring people together. Our philosophy is rooted in three principles: quality, speed, and community. We champion local businesses, support our delivery partners, and are dedicated to serving you with excellence.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values Section - Card-based with icons */}
        <div className="max-w-6xl mx-auto text-center mb-20">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-12">
            The Values That Guide Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Card 1: Culinary Excellence */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transition-all duration-300 transform hover:scale-105 hover:bg-orange-50">
              <div className="flex justify-center items-center mb-6">
                <div className="p-4 bg-orange-600 rounded-full">
                  <ChefHat size={36} className="text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Culinary Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                We partner with only the best restaurants to bring you dishes made with passion and the finest ingredients.
              </p>
            </div>

            {/* Card 2: Blazing Fast Delivery */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transition-all duration-300 transform hover:scale-105 hover:bg-red-50">
              <div className="flex justify-center items-center mb-6">
                <div className="p-4 bg-red-600 rounded-full">
                  <Rocket size={36} className="text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Reliable & Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Our cutting-edge technology and dedicated fleet ensure your order is on time, every time, with real-time tracking.
              </p>
            </div>
            
            {/* Card 3: Customer at the Core */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transition-all duration-300 transform hover:scale-105 hover:bg-yellow-50">
              <div className="flex justify-center items-center mb-6">
                <div className="p-4 bg-yellow-600 rounded-full">
                  <Heart size={36} className="text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Customer at the Core</h3>
              <p className="text-gray-600 leading-relaxed">
                Your satisfaction is our top priority. We're committed to providing exceptional service and support, 24/7.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action (CTA) */}
        <div className="text-center max-w-4xl mx-auto p-16 rounded-3xl shadow-2xl bg-gradient-to-r from-orange-500 to-red-600 text-white">
          <h2 className="text-4xl font-extrabold mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl leading-relaxed mb-8 opacity-90 font-light">
            Discover a world of flavors delivered right to your doorstep. Your next delicious meal is just a tap away.
          </p>
          <button 
            onClick={() => router.push("/")}
            className="bg-white text-orange-600 font-bold py-4 px-12 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-gray-100"
          >
            Start Ordering Now
          </button>
        </div>
      </div>
    </>
  );
}