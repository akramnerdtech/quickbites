"use client";

import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { CreditCard } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./context/CartContext";
import { storeOrder } from "./lib/orderStorage";

const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#0f172a",
      fontFamily: "Manrope, sans-serif",
      "::placeholder": { color: "#94a3b8" },
    },
    invalid: { color: "#dc2626" },
  },
};

const PaymentForm = ({ totalAmount, cartItems }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(totalAmount * 100),
          cartItems: cartItems.map((item) => ({
            id: item.id,
            qty: item.quantity,
            price: item.price,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment.");
      }

      const { clientSecret } = await response.json();

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      if (paymentIntent.status !== "succeeded") {
        throw new Error("Payment failed. Please try again.");
      }

      const order = storeOrder({
        total: totalAmount,
        paymentMethod: "Card",
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price:
            item.price / 100 ||
            item.defaultPrice / 100 ||
            parseInt(item.costForTwo?.match(/\d+/)?.[0] || "0", 10),
        })),
      });

      clearCart();
      router.push(`/payment-success?orderId=${order.id}&method=card`);
    } catch (err) {
      console.error("[Stripe error]", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-black text-slate-900">
          <CreditCard size={16} className="text-[#e23744]" />
          Card details
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {error && <div className="text-sm font-medium text-red-600">{error}</div>}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full rounded-full bg-[#e23744] px-6 py-4 text-sm font-black text-white transition hover:bg-[#c91d2a] disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {loading ? "Processing..." : `Pay Rs ${totalAmount.toFixed(2)}`}
      </button>
    </form>
  );
};

export default PaymentForm;
