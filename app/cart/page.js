"use client";

import Link from "next/link";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ArrowLeft, Banknote, CreditCard, Minus, Plus, Ticket, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import PaymentForm from "../PaymentForm";
import { useCart } from "../context/CartContext";
import { storeOrder } from "../lib/orderStorage";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const recommendedItems = [
  {
    id: "rec-1",
    name: "Burger",
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/Autosuggest/Top%20200%20queries/Burger.png",
    price: 150,
  },
  {
    id: "rec-2",
    name: "Fries",
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/hiz39akt5zeht2ys8d8w",
    price: 90,
  },
  {
    id: "rec-3",
    name: "Chicken Wings",
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/FOOD_CATALOG/IMAGES/CMS/2025/7/12/c8303418-32bd-454f-84b9-b87d23b53cbf_d2b2c5f0-7419-46e2-9876-64aa51f676b0.jpg",
    price: 220,
  },
  {
    id: "rec-4",
    name: "Cold Coffee",
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/rrlgw7897wioxwninbf5",
    price: 110,
  },
];

export default function CartPage() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart, clearCart, addToCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const router = useRouter();

  const getItemPrice = (item) => {
    const priceFromMenu = item.price / 100 || item.defaultPrice / 100;
    const priceFromCostForTwo = item.costForTwo?.match(/\d+/)?.[0]
      ? parseInt(item.costForTwo.match(/\d+/)[0], 10)
      : 0;
    return priceFromMenu || priceFromCostForTwo;
  };

  const subtotal = cartItems.reduce(
    (accumulator, item) => accumulator + getItemPrice(item) * (item.quantity || 0),
    0
  );
  const deliveryFee = subtotal >= 500 ? 0 : 50;
  const taxes = subtotal * 0.05;
  const finalTotal = subtotal + taxes + deliveryFee - discount;

  const handleApplyPromoCode = () => {
    if (promoCode === "QUICK50" && finalTotal >= 1149) {
      setDiscount(subtotal * 0.5);
      alert("Promo code applied");
    } else if (finalTotal < 1149) {
      alert("Promo code is valid only for orders above 1149");
    } else {
      setDiscount(0);
      alert("Invalid promo code");
    }
  };

  const handleCashOnDelivery = () => {
    const order = storeOrder({
      total: finalTotal,
      paymentMethod: "Cash on Delivery",
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: getItemPrice(item),
      })),
    });

    clearCart();
    router.push(`/payment-success?orderId=${order.id}&method=cod`);
  };

  return (
    <main className="min-h-screen px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-[#e23744]/30 hover:text-[#e23744]"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Your cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="mt-10 rounded-[36px] border border-slate-200/80 bg-white p-10 text-center shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <h2 className="text-3xl font-black text-slate-900">Your cart is empty</h2>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              Start adding some delicious food to your cart to see it here.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex rounded-full bg-[#e23744] px-6 py-3 text-sm font-black text-white transition hover:bg-[#c91d2a]"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <section className="space-y-5">
              {cartItems.map((item) => {
                const price = getItemPrice(item);

                return (
                  <article
                    key={item.id}
                    className="flex flex-col gap-5 rounded-[32px] border border-slate-200/80 bg-white p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:flex-row sm:items-center"
                  >
                    <img
                      src={
                        item.image ||
                        `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item.cloudinaryImageId}`
                      }
                      alt={item.name}
                      className="h-28 w-full rounded-[24px] object-cover sm:w-28"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-xl font-black tracking-tight text-slate-900">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {item.cuisines?.slice(0, 2).join(", ") || "Cuisine N/A"}
                      </p>
                      <p className="mt-3 text-lg font-black text-[#e23744]">Rs {price}</p>
                    </div>
                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                      <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 p-1">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-full text-slate-700 transition hover:bg-white"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-10 text-center text-sm font-black text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-full text-slate-700 transition hover:bg-white"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-red-500"
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>
                    </div>
                  </article>
                );
              })}
            </section>

            <aside className="rounded-[36px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] lg:sticky lg:top-28 lg:self-start">
              <h2 className="text-2xl font-black tracking-tight text-slate-900">Order summary</h2>

              <div className="mt-6 space-y-4 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">Rs {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span className="font-bold text-slate-900">Rs {taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery fee</span>
                  <span className="font-bold text-slate-900">
                    {subtotal >= 500 ? "Free" : `Rs ${deliveryFee}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#1ba672]">
                    <span>Promo discount</span>
                    <span className="font-bold">-Rs {discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 rounded-[28px] bg-[#fff1f2] p-4">
                <div className="flex items-center gap-2 text-sm font-black text-slate-900">
                  <Ticket size={16} className="text-[#e23744]" />
                  Apply promo code
                </div>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(event) => setPromoCode(event.target.value)}
                    placeholder="Enter code"
                    className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#e23744]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromoCode}
                    className="rounded-full bg-slate-900 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm font-black text-slate-900">Payment method</p>
                <div className="mt-4 grid gap-3">
                  {[
                    {
                      id: "card",
                      title: "Pay online",
                      text: "Use debit card, credit card, or supported online methods.",
                      icon: CreditCard,
                    },
                    {
                      id: "cod",
                      title: "Cash on delivery",
                      text: "Pay when your order reaches you.",
                      icon: Banknote,
                    },
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setPaymentMethod(option.id);
                      }}
                      className={`rounded-[24px] border p-4 text-left transition ${
                        paymentMethod === option.id
                          ? "border-[#e23744] bg-[#fff1f2]"
                          : "border-slate-200 bg-white hover:border-[#e23744]/25"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#e23744]">
                          <option.icon size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900">{option.title}</p>
                          <p className="mt-1 text-sm leading-6 text-slate-500">{option.text}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-dashed border-slate-200 pt-6">
                <span className="text-xl font-black text-slate-900">Total</span>
                <span className="text-2xl font-black text-[#e23744]">
                  Rs {finalTotal.toFixed(2)}
                </span>
              </div>

              {paymentMethod === "card" ? (
                <div className="mt-6">
                  <Elements stripe={stripePromise}>
                    <PaymentForm totalAmount={finalTotal} cartItems={cartItems} />
                  </Elements>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleCashOnDelivery}
                  className="mt-6 w-full rounded-full bg-[#e23744] px-6 py-4 text-sm font-black text-white transition hover:bg-[#c91d2a]"
                >
                  Place order with cash on delivery
                </button>
              )}
            </aside>
          </div>
        )}

        {cartItems.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              You might also like
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {recommendedItems.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-[30px] border border-slate-200/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)]"
                >
                  <img src={item.image} alt={item.name} className="h-36 w-full object-cover" />
                  <div className="p-5">
                    <h3 className="text-lg font-black text-slate-900">{item.name}</h3>
                    <p className="mt-2 text-sm text-slate-500">Rs {item.price}</p>
                    <button
                      type="button"
                      onClick={() =>
                        addToCart({
                          id: item.id,
                          name: item.name,
                          price: item.price * 100,
                          image: item.image,
                          cloudinaryImageId: "",
                          cuisines: ["Recommended"],
                          locality: "QuickBites City",
                        })
                      }
                      className="mt-4 w-full rounded-full border border-[#e23744]/25 py-2.5 text-sm font-black text-[#e23744] transition hover:bg-[#fff1f2]"
                    >
                      Add
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
