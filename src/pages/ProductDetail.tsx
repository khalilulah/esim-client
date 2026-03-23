import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import type { Product } from "../types";
import { useCartStore } from "../store/cartStore";
import { getProductById } from "../services/product.service";

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<
    "description" | "ingredients" | "howToUse"
  >("description");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id as string);
        setProduct(data);
      } catch {
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <p className="uppercase tracking-widest text-sm text-neutral-400">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center gap-4 h-64">
          <p className="font-League text-4xl uppercase">Product not found</p>
          <button
            onClick={() => navigate("/")}
            className="outline-2 outline-black outline-offset-4 px-10 py-3 font-League text-lg uppercase cursor-pointer"
          >
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { key: "description", label: "Description" },
    { key: "ingredients", label: "Ingredients" },
    { key: "howToUse", label: "How to Use" },
  ] as const;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image gallery */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-20 overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImage === i
                      ? "border-neutral-900"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="flex-1 aspect-[3/4] overflow-hidden bg-neutral-100">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="uppercase tracking-widest text-sm text-neutral-400 mb-2">
                {product.category}
              </p>
              <h1
                className="font-League uppercase leading-none mb-6"
                style={{ fontSize: "clamp(40px, 6vw, 96px)" }}
              >
                {product.name}
              </h1>
              <p className="font-League text-4xl mb-10">
                ${product.price.toFixed(2)}
              </p>

              {/* Tabs */}
              <div className="border-b border-neutral-200 flex gap-8 mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`pb-3 uppercase tracking-widest text-sm cursor-pointer transition-all ${
                      activeTab === tab.key
                        ? "border-b-2 border-neutral-900 text-neutral-900"
                        : "text-neutral-400 hover:text-neutral-600"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="text-neutral-600 leading-relaxed min-h-[120px]">
                {activeTab === "description" && (
                  <p>{product.description ?? "No description available."}</p>
                )}
                {activeTab === "ingredients" &&
                  (product.ingredients && product.ingredients.length > 0 ? (
                    <ul className="flex flex-wrap gap-2">
                      {product.ingredients.map((item) => (
                        <li
                          key={item}
                          className="bg-neutral-100 px-3 py-1 text-sm text-neutral-700"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Ingredients not listed.</p>
                  ))}
                {activeTab === "howToUse" && (
                  <p>{product.howToUse ?? "Instructions not available."}</p>
                )}
              </div>
            </div>

            {/* Quantity + CTA */}
            <div className="mt-12 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="uppercase tracking-widest text-sm text-neutral-500">
                  Qty
                </span>
                <div className="flex items-center border border-neutral-300">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-xl hover:bg-neutral-100 transition-colors cursor-pointer"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-League text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-xl hover:bg-neutral-100 transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-neutral-400">
                  ${(product.price * quantity).toFixed(2)} total
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 uppercase tracking-widest text-sm transition-colors cursor-pointer ${
                    added
                      ? "bg-neutral-500 text-white"
                      : "bg-neutral-900 text-white hover:bg-neutral-700"
                  }`}
                >
                  {added ? "✓ Added to Cart" : "Add to Cart"}
                </button>
                <button
                  onClick={() => navigate("/cart")}
                  className="flex-1 outline-2 outline-neutral-900 outline-offset-4 py-4 uppercase tracking-widest text-sm hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  View Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
