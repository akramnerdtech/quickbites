// src/app/my-orders/page.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowLeft, FaClock, FaTruck, FaCheckCircle } from "react-icons/fa";


const DUMMY_ORDERS = [
  {
    id: "ORDER-185415",
    date: "2025-17-09T02:35:00Z",
    total: 87.50,
    status: "in-progress",
    items: [
      { name: "Biryani, Tandoor", quantity: 1, price: 150,},
     
    ],
  },
//   {
//     id: "ORDER-67890",
//     date: "2023-10-26T14:30:00Z",
//     total: 350.00,
//     status: "out-for-delivery",
//     items: [
//       { name: "Burger", quantity: 2, price: 150 },
//       { name: "Cold Coffee", quantity: 1, price: 110 },
//     ],
//   },
//   {
//     id: "ORDER-11223",
//     date: "2023-10-26T18:00:00Z",
//     total: 550.00,
//     status: "in-progress",
//     items: [
//       { name: "Pizza", quantity: 1, price: 500 },
//       { name: "Coke", quantity: 1, price: 50 },
//     ],
//   },
];

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching data from a server
    // In a real app, you would replace this with an API call (e.g., using fetch)
    const fetchOrders = async () => {
      try {
        // Replace with your actual API endpoint for fetching user orders
        // Example: const response = await fetch('/api/orders');
        // const data = await response.json();
        
        // Simulate a network delay
        setTimeout(() => {
          setOrders(DUMMY_ORDERS);
          setLoading(false);
        }, 1500);
        
      } catch (err) {
        setError("Failed to fetch orders.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "in-progress":
        return <FaClock className="text-blue-500 mr-2" />;
      case "out-for-delivery":
        return <FaTruck className="text-orange-500 mr-2" />;
      case "delivered":
        return <FaCheckCircle className="text-green-500 mr-2" />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "in-progress":
        return "In Progress";
      case "out-for-delivery":
        return "Out for Delivery";
      case "delivered":
        return "Delivered";
      default:
        return "Unknown";
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6 md:p-10 lg:p-16 pt-20 font-sans">
        <div className="text-xl font-medium text-gray-600">
          Loading your orders...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6 md:p-10 lg:p-16 pt-20 font-sans">
        <div className="text-red-500 font-medium">{error}</div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-10 lg:p-16 pt-20 font-sans">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/"
            className="flex items-center text-orange-600 font-medium hover:text-orange-700 transition"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold mt-6 text-gray-800">My Orders</h1>
        </div>
        
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              You have no past orders.
            </h2>
            <p className="text-gray-500 text-center max-w-sm">
              Place your first order and it will appear here.
            </p>
            <Link href="/" className="mt-6 w-full md:w-auto px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition transform hover:scale-105">
              Start Ordering Now
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div 
                key={order.id} 
                className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 border-b pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Order #{order.id}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Ordered on: {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center mt-3 md:mt-0">
                    {getStatusIcon(order.status)}
                    <span className={`font-semibold capitalize ${
                      order.status === "delivered" ? "text-green-600" :
                      order.status === "out-for-delivery" ? "text-orange-600" :
                      "text-blue-600"
                    }`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-gray-700">
                      <span>{item.name} x {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between font-bold text-gray-800 border-t border-dashed pt-4 mt-4">
                  <span>Total</span>
                  <span>₹{order.total.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}