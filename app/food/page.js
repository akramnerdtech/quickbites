"use client";
import { useRouter } from "next/navigation";
import { FaStar, FaClock, FaUtensils } from "react-icons/fa";

export default function FoodDetailPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* Hero Image */}
      <div className="w-full max-w-3xl mt-20 rounded-2xl overflow-hidden shadow-lg p-4">
        <img
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/rvxp5xbniat84r6efku2"
          alt="Delicious Food"
          className="w-full h-72 object-cover"
        />

      <h2 className="text-gray-500 mt-6  font-semibold">  A rich and creamy curry made with soft paneer cubes simmered in a
          flavorful tomato-butter gravy. Perfect with naan or rice.  A rich and creamy curry made with soft paneer cubes simmered in a
          flavorful tomato-butter gravy. Perfect with naan or rice.  A rich and creamy curry made with soft paneer cubes simmered in a
          flavorful tomato-butter gravy. Perfect with naan or rice.</h2> 
      
      </div>

      {/* Food Info */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 mt-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Paneer Butter Masala
        </h1>
        <p className="text-gray-600 mt-2 text-base">
          A rich and creamy curry made with soft paneer cubes simmered in a
          flavorful tomato-butter gravy. Perfect with naan or rice.
        </p>

        {/* Stats */}
        <div className="flex items-center gap-6 mt-4 text-gray-700">
          <span className="flex items-center gap-1">
            <FaStar className="text-yellow-500" /> 4.5
          </span>
          <span className="flex items-center gap-1">
            <FaClock className="text-orange-500" /> 30 mins
          </span>
          <span className="flex items-center gap-1">
            <FaUtensils className="text-green-600" /> North Indian
          </span>
        </div>

        {/* Price + CTA */}
        <div className="mt-6 flex justify-between items-center">
          <span className="text-2xl font-bold text-orange-600">₹220</span>
          <button
            onClick={() => console.log("Button was clicked")}
            className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-6 py-3 rounded-full shadow-md transition"
          >
            Add to Cart
            
          </button>
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.push("/")}
        className="mt-6 text-orange-600 hover:underline"
      >
        ← Back to Home
      </button>
    </div>
  );
}
