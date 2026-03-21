import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCartStore } from "../store/cartStore";

function Cart() {
  const navigate = useNavigate();
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center gap-6 mt-40">
          <p className="font-League uppercase text-5xl leading-none">
            Your cart is empty
          </p>
          <button
            onClick={() => navigate("/")}
            className="outline-2 outline-black outline-offset-4 px-16 py-4 uppercase tracking-widest text-sm cursor-pointer hover:bg-neutral-50 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="px-4 md:px-20 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors mb-10 cursor-pointer"
        >
          <span className="text-xl leading-none">←</span>
          <span className="uppercase tracking-widest text-sm">Back</span>
        </button>
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <h1
            className="font-League uppercase leading-none"
            style={{ fontSize: "clamp(40px, 7vw, 120px)" }}
          >
            Cart
          </h1>
          <button
            onClick={clearCart}
            className="text-sm uppercase tracking-widest text-neutral-400 hover:text-red-500 transition-colors cursor-pointer mb-2"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* ── Cart Items ── */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex gap-6 border-b border-neutral-100 pb-8"
              >
                {/* Image */}
                <div
                  className="shrink-0 overflow-hidden bg-neutral-100 cursor-pointer"
                  style={{ width: "100px", height: "130px" }}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img
                    src={product.images?.[0] ?? "/placeholder.jpg"}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-neutral-400 mb-1">
                      {product.category}
                    </p>
                    <h3
                      className="font-League uppercase leading-none cursor-pointer hover:text-neutral-500 transition-colors"
                      style={{ fontSize: "clamp(20px, 3vw, 36px)" }}
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Quantity */}
                    <div className="flex items-center border border-neutral-300">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100 transition-colors cursor-pointer"
                      >
                        −
                      </button>
                      <span className="w-10 text-center text-sm font-League">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100 transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* Price + Remove */}
                    <div className="flex items-center gap-6">
                      <span className="font-League text-xl">
                        ${(product.price * quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-neutral-300 hover:text-red-500 transition-colors cursor-pointer text-xl leading-none"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Order Summary ── */}
          <div className="lg:col-span-1">
            <div className="border border-neutral-200 p-8 sticky top-8">
              <h2 className="font-League uppercase text-2xl leading-none mb-8">
                Order Summary
              </h2>

              <div className="flex flex-col gap-4 text-sm text-neutral-600 mb-8">
                <div className="flex justify-between">
                  <span className="uppercase tracking-widest">Items</span>
                  <span>{totalItems()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="uppercase tracking-widest">Subtotal</span>
                  <span>${totalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="uppercase tracking-widest">Shipping</span>
                  <span className="text-neutral-400">
                    Calculated at checkout
                  </span>
                </div>
                <div className="h-px bg-neutral-200 my-2" />
                <div className="flex justify-between font-League text-2xl text-neutral-900">
                  <span>Total</span>
                  <span>${totalPrice().toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-neutral-900 text-white py-4 uppercase tracking-widest text-sm hover:bg-neutral-700 transition-colors cursor-pointer mb-4">
                Checkout
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full outline-2 outline-neutral-900 outline-offset-4 py-4 uppercase tracking-widest text-sm hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
