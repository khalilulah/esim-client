import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import { trackOrder } from "../services/order.service";

function TrackOrder() {
  const { orderNumber: paramOrderNumber } = useParams<{
    orderNumber?: string;
  }>();
  const navigate = useNavigate();
  const [input, setInput] = useState(paramOrderNumber ?? "");
  const [submitted, setSubmitted] = useState(!!paramOrderNumber);

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["order", input],
    queryFn: () => trackOrder(input),
    enabled: submitted && !!input,
    retry: false,

    // Poll every 5 seconds if payment is still pending — stops automatically when paid
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data) return false;
      if (data.paymentStatus === "pending") return 5000; // refetch every 5s
      return false; // stop polling once paid/failed
    },
  });

  const handleTrack = () => {
    if (!input.trim()) return;
    setSubmitted(true);
    navigate(`/track/${input.trim()}`, { replace: true });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="px-4 md:px-20 py-12 max-w-2xl">
        <h1
          className="font-League uppercase leading-none mb-12"
          style={{ fontSize: "clamp(40px, 7vw, 100px)" }}
        >
          Track Order
        </h1>

        {/* Input */}
        <div className="flex gap-4 mb-12">
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setSubmitted(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleTrack()}
            placeholder="ESIM-A3F9X2"
            className="flex-1 border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-900 transition-colors uppercase"
          />
          <button
            onClick={handleTrack}
            className="bg-neutral-900 text-white px-8 py-3 uppercase tracking-widest text-sm hover:bg-neutral-700 transition-colors cursor-pointer"
          >
            Track
          </button>
        </div>

        {isLoading && (
          <p className="uppercase tracking-widest text-sm text-neutral-400 animate-pulse">
            Looking up your order...
          </p>
        )}

        {isError && (
          <p className="uppercase tracking-widest text-sm text-red-400">
            Order not found. Check your order number and try again.
          </p>
        )}

        {order && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <p className="uppercase tracking-widest text-xs text-neutral-400">
                Order
              </p>
              <p className="font-League text-xl">{order.orderNumber}</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="uppercase tracking-widest text-xs text-neutral-400">
                Status
              </p>
              <span
                className={`uppercase tracking-widest text-xs px-3 py-1 ${
                  order.status === "delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : order.status === "shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <p className="uppercase tracking-widest text-xs text-neutral-400">
                Payment
              </p>
              <span
                className={`uppercase tracking-widest text-xs px-3 py-1 ${
                  order.paymentStatus === "paid"
                    ? "bg-green-100 text-green-700"
                    : order.paymentStatus === "failed"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.paymentStatus}
              </span>
            </div>

            <div className="border-t border-neutral-100 pt-6">
              <p className="uppercase tracking-widest text-xs text-neutral-400 mb-3">
                Delivering to
              </p>
              <p className="text-sm leading-relaxed text-neutral-600">
                {order.shippingAddress.street}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.state}
              </p>
            </div>

            <div className="border-t border-neutral-100 pt-6">
              <p className="uppercase tracking-widest text-xs text-neutral-400 mb-3">
                Items
              </p>
              {order.items.map((item) => (
                <div
                  key={item.product}
                  className="flex justify-between text-sm py-2"
                >
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between font-League text-xl pt-4 border-t border-neutral-100 mt-2">
                <span>Total</span>
                <span>₦{order.grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackOrder;
