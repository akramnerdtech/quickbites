"use client";

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PaymentForm = ({ totalAmount, cartItems }) => {
  const stripe = useStripe();
  const elements = useElements();
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
      // 1. Create a Payment Intent on your server
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(totalAmount * 100), 
          cartItems: cartItems.map(item => ({ id: item.id, qty: item.quantity, price: item.price }))
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create PaymentIntent.");
      }
      
      const { clientSecret } = await response.json();

      // 2. Confirm the payment with the card details
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      if (paymentIntent.status === "succeeded") {
      
      router.push("/payment-success"); 
      } else {
        throw new Error("Payment failed. Please try again.");
      }
    } catch (err) {
      console.error("[Stripe error]", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">Card Details</label>
        <div className="p-3 bg-white border border-gray-300 rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": { color: "#aab7c4" },
                },
                invalid: { color: "#9e2146" },
              },
            }}
          />
        </div>
      </div>
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-green-600 cursor-pointer text-white py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition transform hover:scale-[1.01] disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : `Pay ₹${totalAmount.toFixed(2)}`}
      </button>
    </form>
  );
};

export default PaymentForm;