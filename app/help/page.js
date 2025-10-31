"use client";

import React, { useState } from "react";
import { Search, ChevronDown, Phone, Mail, ShoppingBag, CreditCard, User, List, IndianRupee } from "lucide-react";





const helpTopics = [
    {
        id: "orders",
        title: "Orders & Delivery",
        questions: [
            {
                q: "How can I track my order?",
                a: "You can track your order in real-time on the app's 'My Orders' page. A live map shows the delivery partner's location.",
            },
            {
                q: "What if my food is late?",
                a: "We work hard to ensure timely delivery. If your order is significantly delayed, please check the app for updates or contact our support team.",
            },
            {
                q: "Can I cancel my order?",
                a: "Orders can be canceled only before the restaurant accepts them. Once accepted, cancellations are subject to a fee.",
            },
        ],
    },
    {
        id: "payments",
        title: "Payments & Refunds",
        questions: [
            {
                q: "What payment methods are available?",
                a: "We accept all major credit/debit cards, UPI, net banking, and digital wallets.",
            },
            {
                q: "How do I get a refund?",
                a: "Refunds for canceled or incorrect orders are processed automatically to your original payment method. The timeline depends on your bank.",
            },
        ],
    },
    {
        id: "account",
        title: "Account & Profile",
        questions: [
            {
                q: "How do I change my phone number or email?",
                a: "You can update your contact information in the 'My Account' section of the app settings.",
            },
            {
                q: "I forgot my password. What should I do?",
                a: "On the login screen, click 'Forgot Password' and follow the instructions to reset it via your registered email or phone number.",
            },
        ],
    },
];

const quickLinks = [
    { title: "Track My Order", icon: ShoppingBag, href: "/my-orders" },
    { title: "Manage Payments", icon: CreditCard, href: "/payments" },
    { title: "Update Profile", icon: User, href: "/profile" },
    { title: "My Recent Orders", icon: List, href: "/order-history" },
    { title: "Payments Failed", icon: IndianRupee, href: "/payments-failed"}
];

const HelpPage = () => {
    const [searchTerm, setSearchTerm] = useState("");

  

    const filteredTopics = helpTopics.map(topic => {
        const filteredQuestions = topic.questions.filter(q =>
            q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.a.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return { ...topic, questions: filteredQuestions };
    }).filter(topic => topic.questions.length > 0);

    return (
        <>
           
            <div className="bg-white text-gray-800 min-h-screen pt-24 pb-12 px-6 font-sans">
                <div className="max-w-4xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-16 relative py-12 px-6 rounded-3xl overflow-hidden">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600">
                                How Can We Help?
                            </span>
                        </h1>
                        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                            Find instant answers to common questions or get in touch with our friendly support team.
                        </p>
                    </div>
                    

                    {/* Search Bar */}
                    <div className="relative w-full max-w-2xl mx-auto mb-12 -mt-20 z-10">
                        <input
                            type="text"
                            placeholder="Search for a question..."
                            className="w-full pl-12 pr-4 py-4 rounded-full bg-white border border-gray-300 shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                    </div>

                    {/* Quick Links Section */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Quick Links</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {quickLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className="flex flex-col items-center justify-center p-4 md:p-6 bg-white rounded-xl shadow-md border border-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-orange-50"
                                >
                                    <link.icon size={32} className="text-orange-500 mb-2" />
                                    <span className="text-sm font-semibold text-center">{link.title}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Help Topics/FAQs Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Popular Questions</h2>
                        <div className="divide-y divide-gray-200">
                            {filteredTopics.length > 0 ? (
                                filteredTopics.map((topic) => (
                                    <div key={topic.id} className="py-4">
                                        <h3 className="text-xl font-bold text-orange-600 mb-4">{topic.title}</h3>
                                        <div className="space-y-4">
                                            {topic.questions.map((item, index) => (
                                                <details
                                                    key={index}
                                                    className="group rounded-lg border border-gray-200 p-4 transition-all duration-300 hover:border-orange-500 hover:shadow-md"
                                                >
                                                    <summary className="flex items-center justify-between cursor-pointer font-semibold text-gray-800">
                                                        <span>{item.q}</span>
                                                        <ChevronDown className="transform transition-transform duration-300 group-open:rotate-180 text-orange-500" size={20} />
                                                    </summary>
                                                    <div className="mt-4 text-sm text-gray-600 leading-relaxed">
                                                        <p>{item.a}</p>
                                                    </div>
                                                </details>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 py-8">
                                    No results found for "{searchTerm}".
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Contact Us Section */}
                    <div className="mt-12 text-center bg-orange-600 text-white rounded-2xl shadow-xl p-8 md:p-12">
                        <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
                        <p className="text-lg mb-6 opacity-90">
                            Our support team is ready to assist you 24/7.
                        </p>
                        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8">
                            <a
                                href="tel:+1234567890"
                                className="inline-flex items-center justify-center bg-white text-orange-600 font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105"
                            >
                                <Phone size={20} className="mr-2" /> Call Us
                            </a>
                            <a
                                href="mailto:support@app.com"
                                className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:bg-white hover:text-orange-600 hover:scale-105"
                            >
                                <Mail size={20} className="mr-2" /> Email Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HelpPage;