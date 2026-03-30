import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOrderEmails } from "../services/email.service";
import Navbar from "../components/Navbar";
import { useCartStore } from "../store/cartStore";

import type { OrderResponse } from "../types";
import { createOrder } from "../services/order.service";

const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

declare global {
  interface Window {
    PaystackPop: {
      setup: (config: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        ref: string;
        onClose: () => void;
        callback: (response: { reference: string }) => void;
      }) => { openIframe: () => void };
    };
  }
}

const SHIPPING_FEES: Record<string, number> = {
  lagos: 2000,
  fct: 2500,
  abuja: 2500,
};
const DEFAULT_SHIPPING = 3500;

const getShippingFee = (state: string) =>
  SHIPPING_FEES[state.toLowerCase()] ?? DEFAULT_SHIPPING;

interface FormState {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
}

const emptyForm: FormState = {
  name: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  state: "",
};

function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCartStore();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [createdOrder, setCreatedOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const shippingFee = form.state
    ? getShippingFee(form.state)
    : DEFAULT_SHIPPING;
  const grandTotal = totalPrice() + shippingFee;

  // Redirect if cart is empty
  if (items.length === 0 && !createdOrder) {
    navigate("/");
    return null;
  }

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (!form.street.trim()) newErrors.street = "Street address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state) newErrors.state = "State is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 1 — create order in DB, get back grandTotal and reference
  const handleCreateOrder = async (): Promise<OrderResponse | null> => {
    if (!validate()) return null;
    setLoading(true);
    setError("");
    try {
      const payload = {
        customer: {
          name: form.name,
          email: form.email,
          phone: form.phone,
        },
        shippingAddress: {
          street: form.street,
          city: form.city,
          state: form.state,
        },
        items: items.map(({ product, quantity }) => ({
          product: product._id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] ?? "",
          quantity,
        })),
        totalPrice: totalPrice(),
      };
      const order = await createOrder(payload);
      setCreatedOrder(order);
      return order;
    } catch {
      setError("Failed to create order. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    let order = createdOrder;

    if (!order) {
      order = await handleCreateOrder();
      if (!order) return;
    }

    const confirmedOrder = order;

    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: form.email,
      amount: confirmedOrder.grandTotal * 100,
      currency: "NGN",
      ref: confirmedOrder.paymentReference,
      onClose: () => {
        setError(
          "Payment was not completed. Your order is saved — you can try again.",
        );
      },
      callback: () => {
        // Use cart items directly — they have all the info needed
        const itemsText = items
          .map(
            ({ product, quantity }) =>
              `${product.name} x${quantity} — ₦${(product.price * quantity).toLocaleString()}`,
          )
          .join("\n");

        sendOrderEmails({
          orderNumber: confirmedOrder.orderNumber,
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          items: itemsText,
          subtotal: `₦${totalPrice().toLocaleString()}`,
          shippingFee: `₦${confirmedOrder.shippingFee.toLocaleString()}`,
          grandTotal: `₦${confirmedOrder.grandTotal.toLocaleString()}`,
          deliveryAddress: `${form.street}, ${form.city}, ${form.state}`,
        }).catch(console.error);

        clearCart();
        navigate(`/order-confirmation/${confirmedOrder.orderNumber}`);
      },
    });

    handler.openIframe();
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="px-4 md:px-20 py-12">
        <h1
          className="font-League uppercase leading-none mb-12"
          style={{ fontSize: "clamp(40px, 7vw, 100px)" }}
        >
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* ── Left — Form ── */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            {error && (
              <p className="text-red-500 uppercase tracking-widest text-xs">
                {error}
              </p>
            )}

            {/* Contact */}
            <div>
              <h2 className="font-League uppercase text-2xl leading-none mb-6">
                Contact Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Full Name"
                  value={form.name}
                  error={errors.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  placeholder="John Doe"
                />
                <Field
                  label="Email"
                  value={form.email}
                  error={errors.email}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  placeholder="john@example.com"
                  type="email"
                />
                <Field
                  label="Phone"
                  value={form.phone}
                  error={errors.phone}
                  onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                  placeholder="08012345678"
                  type="tel"
                />
              </div>
            </div>

            {/* Shipping */}
            <div>
              <h2 className="font-League uppercase text-2xl leading-none mb-6">
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Field
                    label="Street Address"
                    value={form.street}
                    error={errors.street}
                    onChange={(v) => setForm((f) => ({ ...f, street: v }))}
                    placeholder="12 Adeola Odeku Street"
                  />
                </div>
                <Field
                  label="City"
                  value={form.city}
                  error={errors.city}
                  onChange={(v) => setForm((f) => ({ ...f, city: v }))}
                  placeholder="Victoria Island"
                />
                <div className="flex flex-col gap-1">
                  <label className="uppercase tracking-widest text-xs text-neutral-400">
                    State
                  </label>
                  <select
                    value={form.state}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, state: e.target.value }))
                    }
                    className={`border px-4 py-3 text-sm outline-none focus:border-neutral-900 transition-colors bg-white ${
                      errors.state ? "border-red-400" : "border-neutral-200"
                    }`}
                  >
                    <option value="">Select state</option>
                    {NIGERIAN_STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-red-400 text-xs">{errors.state}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right — Order Summary ── */}
          <div className="lg:col-span-1">
            <div className="border border-neutral-200 p-8 sticky top-8">
              <h2 className="font-League uppercase text-2xl leading-none mb-8">
                Order Summary
              </h2>

              {/* Items */}
              <div className="flex flex-col gap-4 mb-8">
                {items.map(({ product, quantity }) => (
                  <div key={product._id} className="flex gap-4 items-center">
                    <img
                      src={product.images?.[0] ?? "/placeholder.jpg"}
                      alt={product.name}
                      className="w-12 h-14 object-cover shrink-0"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium uppercase">
                        {product.name}
                      </p>
                      <p className="text-xs text-neutral-400">x{quantity}</p>
                    </div>
                    <p className="text-sm">
                      ₦{(product.price * quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="flex flex-col gap-3 text-sm border-t border-neutral-100 pt-6">
                <div className="flex justify-between">
                  <span className="uppercase tracking-widest text-neutral-400">
                    Subtotal
                  </span>
                  <span>₦{totalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="uppercase tracking-widest text-neutral-400">
                    Shipping
                  </span>
                  <span>
                    {form.state
                      ? `₦${shippingFee.toLocaleString()}`
                      : "Select state"}
                  </span>
                </div>
                <div className="h-px bg-neutral-200 my-2" />
                <div className="flex justify-between font-League text-2xl">
                  <span>Total</span>
                  <span>₦{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-neutral-900 text-white py-4 uppercase tracking-widest text-sm hover:bg-neutral-700 transition-colors cursor-pointer disabled:opacity-50 mt-8"
              >
                {loading ? "Processing..." : "Pay Now"}
              </button>

              <p className="text-xs text-neutral-400 text-center mt-4">
                Secured by Paystack
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable field component
interface FieldProps {
  label: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}

function Field({
  label,
  value,
  error,
  onChange,
  placeholder,
  type = "text",
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="uppercase tracking-widest text-xs text-neutral-400">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`border px-4 py-3 text-sm outline-none focus:border-neutral-900 transition-colors ${
          error ? "border-red-400" : "border-neutral-200"
        }`}
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}

export default Checkout;
