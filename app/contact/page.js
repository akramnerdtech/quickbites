// src/app/contact/page.js
"use client";

import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { ChevronDown, ChevronUp, CheckCircle, X } from "lucide-react";
import Header from "../header/Header";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const closePopup = () => {
    setShowSuccessPopup(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    // Show the success popup
    setShowSuccessPopup(true);

    // Hide the popup after 4 seconds
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 4000);
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "How do I track my order?",
      answer: "You can track your order in real-time on the 'My Orders' page after your payment is confirmed. You'll receive a notification when the delivery partner is on their way."
    },
    {
      question: "What are your delivery hours?",
      answer: "Our delivery partners operate from 10:00 AM to 11:00 PM, seven days a week. Hours may vary on holidays."
    },
    {
      question: "Can I change my order after placing it?",
      answer: "Once an order is confirmed, it is immediately sent to the restaurant. We cannot guarantee changes or cancellations. Please check your cart carefully before checking out."
    },
    {
      question: "What should I do if my order is late?",
      answer: "You can check the live tracking on your order page for the most up-to-date status. If the estimated time has passed, please contact our support team, and we will assist you immediately."
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 text-gray-800 py-20">
        <div className="container mx-auto px-6 pt-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
              Get In Touch
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're here to help! Whether you have a question about an order,
              feedback on a restaurant, or a partnership inquiry, please reach
              out.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-200">
            {/* Contact Information Section */}
            <div className="lg:w-1/3 flex flex-col justify-between p-6  rounded-2xl">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-orange-600 text-white">
                    <FaPhoneAlt size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Phone</h3>
                    <p className="text-gray-600">+1 (234) 567-8900</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-orange-600 text-white">
                    <FaEnvelope size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Email</h3>
                    <p className="text-gray-600">support@quickbites.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-orange-600 text-white">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Address</h3>
                    <p className="text-gray-600">
                      101 Foodie Lane, Suite 200
                      <br />
                      Culinary City, CA 90210
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="lg:w-2/3 p-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Send a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-gray-100 border-gray-300 rounded-md shadow-sm p-3 focus:border-orange-500 focus:ring-orange-500 text-gray-800"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-gray-100 border-gray-300 rounded-md shadow-sm p-3 focus:border-orange-500 focus:ring-orange-500 text-gray-800"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-gray-100 border-gray-300 rounded-md shadow-sm p-3 focus:border-orange-500 focus:ring-orange-500 text-gray-800"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-gray-100 border-gray-300 rounded-md shadow-sm p-3 focus:border-orange-500 focus:ring-orange-500 text-gray-800"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-orange-600 to-red-600 font-semibold text-white shadow-lg hover:from-orange-700 hover:to-red-700 transition transform hover:-translate-y-0.5 hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-left cursor-pointer transition-transform hover:scale-[1.01]" onClick={() => toggleFaq(index)}>
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg text-gray-900">
                      {item.question}
                    </h3>
                    <span>
                      {openFaqIndex === index ? (
                        <ChevronUp size={24} className="text-orange-600" />
                      ) : (
                        <ChevronDown size={24} className="text-gray-400" />
                      )}
                    </span>
                  </div>
                  <div className={`mt-2 overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className="pt-2 text-gray-600 border-t border-gray-200 mt-2">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full relative text-center border border-gray-200 transform transition-all duration-300 ease-out scale-100">
            <button 
              onClick={closePopup} 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col items-center justify-center">
              <CheckCircle size={48} className="text-green-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
              <p className="text-gray-600">
                Thank you for your message. We'll get back to you as soon as possible.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}