"use client";

import React, { useState } from "react";
import { CheckCircle, ChevronDown, ChevronUp, Mail, MapPin, Phone, X } from "lucide-react";

const faqItems = [
  {
    question: "How do I track my order?",
    answer:
      "You can track your order from the My Orders page after checkout. Status updates appear as the order moves through preparation and delivery.",
  },
  {
    question: "What are your delivery hours?",
    answer:
      "Most partner restaurants are available from morning through late evening, though exact hours depend on the outlet.",
  },
  {
    question: "Can I change my order after placing it?",
    answer:
      "Once an order is confirmed it is usually sent to the restaurant immediately, so changes are limited.",
  },
  {
    question: "What should I do if my order is late?",
    answer:
      "Please check the latest status in My Orders first. If the ETA has passed, contact support and we will help from there.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 4000);
  };

  return (
    <main className="min-h-screen px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-[40px] bg-slate-900 px-6 py-10 text-white shadow-[0_32px_90px_rgba(15,23,42,0.18)] sm:px-8 lg:px-10">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#ffb38d]">
            Contact support
          </p>
          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
            Reach the QuickBites team without leaving the same design flow.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            Questions about orders, payments, delivery updates, or partnerships can
            all start here.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-[36px] border border-[#ffd7c5] bg-[linear-gradient(135deg,#fff1e8_0%,#ffffff_72%)] p-6 shadow-[0_28px_80px_rgba(255,82,0,0.12)] sm:p-8">
            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              Contact information
            </h2>
            <div className="mt-8 space-y-5">
              {[
                { icon: Phone, title: "Phone", text: "+1 (234) 567-8900" },
                { icon: Mail, title: "Email", text: "support@quickbites.com" },
                {
                  icon: MapPin,
                  title: "Address",
                  text: "101 Foodie Lane, Suite 200, Culinary City, CA 90210",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-[28px] bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff1e8] text-[#ff5200]">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-500">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[36px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-8">
            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              Send a message
            </h2>
            <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
              {[
                { id: "name", label: "Name", type: "text" },
                { id: "email", label: "Email", type: "email" },
                { id: "subject", label: "Subject", type: "text" },
              ].map((field) => (
                <div key={field.id}>
                  <label className="mb-2 block text-sm font-bold text-slate-700" htmlFor={field.id}>
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    value={formData[field.id]}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-[#ff5200] focus:bg-white"
                    required
                  />
                </div>
              ))}

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-[#ff5200] focus:bg-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="rounded-full bg-[#ff5200] px-6 py-4 text-sm font-black text-white transition hover:bg-[#e64900]"
              >
                Send message
              </button>
            </form>
          </section>
        </div>

        <section className="mt-12 rounded-[36px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-8">
          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            Frequently asked questions
          </h2>
          <div className="mt-8 space-y-4">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <button
                  key={item.question}
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full rounded-[28px] border border-slate-200 p-5 text-left transition hover:border-[#ff5200]/40"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg font-black text-slate-900">{item.question}</h3>
                    {isOpen ? <ChevronUp className="text-[#ff5200]" /> : <ChevronDown className="text-slate-400" />}
                  </div>
                  {isOpen && <p className="mt-4 text-sm leading-7 text-slate-500">{item.answer}</p>}
                </button>
              );
            })}
          </div>
        </section>
      </section>

      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-sm rounded-[32px] bg-white p-8 text-center shadow-[0_32px_90px_rgba(15,23,42,0.24)]">
            <button
              type="button"
              onClick={() => setShowSuccessPopup(false)}
              className="absolute right-4 top-4 text-slate-400 transition hover:text-slate-700"
              aria-label="Close"
            >
              <X size={22} />
            </button>
            <CheckCircle size={48} className="mx-auto text-[#1ba672]" />
            <h3 className="mt-4 text-2xl font-black text-slate-900">Message sent</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Thanks for reaching out. The support team will get back to you soon.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
