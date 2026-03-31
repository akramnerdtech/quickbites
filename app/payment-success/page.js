import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default async function PaymentSuccessPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const orderId = resolvedSearchParams?.orderId;
  const method = resolvedSearchParams?.method;

  return (
    <main className="min-h-screen px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto flex max-w-3xl items-center justify-center">
        <div className="w-full rounded-[40px] border border-slate-200/80 bg-white p-8 text-center shadow-[0_28px_80px_rgba(15,23,42,0.08)] sm:p-10">
          <CheckCircle2 className="mx-auto text-[#1ba672]" size={72} />

          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900">
            Order confirmed
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-500">
            Your order is now in the system and can be tracked live from the orders page.
          </p>

          {(orderId || method) && (
            <div className="mt-6 rounded-[28px] bg-[#fff1f2] p-5 text-sm text-slate-600">
              {orderId && (
                <p>
                  <span className="font-black text-slate-900">Order ID:</span> {orderId}
                </p>
              )}
              {method && (
                <p className="mt-2">
                  <span className="font-black text-slate-900">Payment method:</span>{" "}
                  {method === "cod" ? "Cash on Delivery" : "Card"}
                </p>
              )}
            </div>
          )}

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="rounded-full bg-[#e23744] px-6 py-3 text-sm font-black text-white transition hover:bg-[#c91d2a]"
            >
              Continue shopping
            </Link>
            <Link
              href="/my-orders"
              className="rounded-full border border-[#e23744]/25 px-6 py-3 text-sm font-black text-[#e23744] transition hover:bg-[#fff1f2]"
            >
              Track my order
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
