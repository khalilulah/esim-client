import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import { trackOrder } from "../services/order.service";

const STATUS_STEPS = ["pending", "processing", "shipped", "delivered"] as const;

function OrderConfirmation() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const navigate = useNavigate();

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["order", orderNumber],
    queryFn: () => trackOrder(orderNumber as string),
    enabled: !!orderNumber,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <p className="uppercase tracking-widest text-sm text-neutral-400 animate-pulse">
            Loading order...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center gap-4 h-64">
          <p className="font-League text-4xl uppercase">Order not found</p>
          <button
            onClick={() => navigate("/")}
            className="outline-2 outline-black outline-offset-4 px-10 py-3 uppercase tracking-widest text-sm cursor-pointer"
          >
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  const currentStep = STATUS_STEPS.indexOf(
    order.status === "cancelled"
      ? "pending"
      : (order.status as (typeof STATUS_STEPS)[number]),
  );

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="px-4 md:px-20 py-12 max-w-3xl">
        {/* Header */}
        <div className="mb-12">
          <p className="uppercase tracking-widest text-sm text-green-500 mb-2">
            {order.paymentStatus === "paid"
              ? "✓ Payment confirmed"
              : "⏳ Payment pending"}
          </p>
          <h1
            className="font-League uppercase leading-none mb-4"
            style={{ fontSize: "clamp(36px, 6vw, 80px)" }}
          >
            Thank you, {order.customer.name.split(" ")[0]}
          </h1>
          <p className="text-neutral-500">
            Order{" "}
            <span className="text-neutral-900 font-medium">
              {order.orderNumber}
            </span>{" "}
            has been received. Save this number to track your order.
          </p>
        </div>

        {/* Order status tracker */}
        <div className="mb-12">
          <h2 className="font-League uppercase text-xl leading-none mb-6">
            Order Status
          </h2>
          <div className="flex items-center gap-2">
            {STATUS_STEPS.map((step, i) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                      i <= currentStep
                        ? "bg-neutral-900 text-white"
                        : "bg-neutral-200 text-neutral-400"
                    }`}
                  >
                    {i < currentStep ? "✓" : i + 1}
                  </div>
                  <span className="uppercase tracking-widest text-xs text-neutral-400 text-center">
                    {step}
                  </span>
                </div>
                {i < STATUS_STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-px mb-6 transition-colors ${
                      i < currentStep ? "bg-neutral-900" : "bg-neutral-200"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Order details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
          <div className="border border-neutral-200 p-6">
            <p className="uppercase tracking-widest text-xs text-neutral-400 mb-4">
              Delivery Address
            </p>
            <p className="text-sm leading-relaxed">
              {order.shippingAddress.street}
              <br />
              {order.shippingAddress.city}
              <br />
              {order.shippingAddress.state}
            </p>
          </div>

          <div className="border border-neutral-200 p-6">
            <p className="uppercase tracking-widest text-xs text-neutral-400 mb-4">
              Contact
            </p>
            <p className="text-sm leading-relaxed">
              {order.customer.name}
              <br />
              {order.customer.email}
              <br />
              {order.customer.phone}
            </p>
          </div>
        </div>

        {/* Items */}
        <div className="mb-12">
          <h2 className="font-League uppercase text-xl leading-none mb-6">
            Items Ordered
          </h2>
          <div className="flex flex-col gap-4">
            {order.items.map((item) => (
              <div
                key={item.product}
                className="flex gap-4 items-center border-b border-neutral-100 pb-4"
              >
                <img
                  src={item.image ?? "/placeholder.jpg"}
                  alt={item.name}
                  className="w-14 h-16 object-cover shrink-0"
                />
                <div className="flex-1">
                  <p className="uppercase font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-neutral-400">x{item.quantity}</p>
                </div>
                <p className="text-sm">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 mt-6 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-400 uppercase tracking-widest">
                Subtotal
              </span>
              <span>₦{order.totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400 uppercase tracking-widest">
                Shipping
              </span>
              <span>₦{order.shippingFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-League text-2xl mt-2">
              <span>Total</span>
              <span>₦{order.grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Track order link */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to={`/track/${order.orderNumber}`}
            className="flex-1 text-center border border-neutral-900 py-4 uppercase tracking-widest text-sm hover:bg-neutral-50 transition-colors"
          >
            Track Order
          </Link>
          <Link
            to="/"
            className="flex-1 text-center bg-neutral-900 text-white py-4 uppercase tracking-widest text-sm hover:bg-neutral-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
