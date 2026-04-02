import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById, getProducts } from "../services/product.service";
import Navbar from "../components/Navbar";
import { useCartStore } from "../store/cartStore";

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<
    "description" | "ingredients" | "howToUse"
  >("description");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id], // cached per product id — each product has its own cache entry
    queryFn: () => getProductById(id as string),
    enabled: !!id, // don't run if id is undefined
  });

  // Add this query inside ProductDetail, after the existing product query:
  const { data: recommendedData } = useQuery({
    queryKey: ["products", "recommended", product?.category],
    queryFn: () => getProducts({ category: product?.category, limit: 4 }),
    enabled: !!product?.category,
    staleTime: 10 * 60 * 1000,
  });

  const recommended =
    recommendedData?.products
      .filter((p) => p._id !== product?._id) // exclude current product
      .slice(0, 3) ?? [];

  const tabs = [
    { key: "description", label: "Description" },
    { key: "ingredients", label: "Ingredients" },
    { key: "howToUse", label: "How to Use" },
  ] as const;

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    console.log(product.ingredients);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <p className="uppercase tracking-widest text-sm text-neutral-400 animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !product) {
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
                ₦{product.price.toFixed(2)}
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
                  <p>{product.description || "No description available."}</p>
                )}
                {activeTab === "ingredients" &&
                  (product.ingredients && product.ingredients.length > 1 ? (
                    <ul className="flex flex-wrap gap-2">
                      {product.ingredients.map((item) => (
                        <li
                          key={item}
                          className="bg-neutral-300 px-3 py-1 text-sm text-neutral-700"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Ingredients not listed.</p>
                  ))}
                {activeTab === "howToUse" && (
                  <p>{product.howToUse || "Instructions not available."}</p>
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
                    className="w-10 h-10 flex items-center justify-center text-xl hover:bg-neutral-300 transition-colors cursor-pointer"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-League text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-xl hover:bg-neutral-300 transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-neutral-400">
                  ₦{(product.price * quantity).toFixed(2)} total
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
                  className="flex-1 outline-2 outline-neutral-900 outline-offset-4 py-4 uppercase tracking-widest text-sm hover:bg-neutral-300 transition-colors cursor-pointer"
                >
                  View Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Recommended */}
      {recommended.length > 0 && (
        <div className="px-4 md:px-20 py-16 border-t border-neutral-100">
          <div className="flex items-center gap-6 mb-10">
            <h2
              className="font-League uppercase leading-none shrink-0"
              style={{ fontSize: "clamp(28px, 4vw, 60px)" }}
            >
              You May Also Like
            </h2>
            <div className="h-px bg-neutral-900 w-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommended.map((item) => (
              <div
                key={item._id}
                className="group cursor-pointer"
                onClick={() => {
                  navigate(`/product/${item._id}`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <div className="overflow-hidden bg-neutral-100 aspect-[3/4]">
                  <img
                    src={item.images?.[0] ?? "/placeholder.jpg"}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex justify-between items-start">
                  <div>
                    <h3 className="font-League text-xl leading-none uppercase tracking-tight">
                      {item.name}
                    </h3>
                    <p className="text-neutral-500 text-sm mt-1 line-clamp-2 max-w-[220px]">
                      {item.description}
                    </p>
                  </div>
                  <span className="font-League text-lg leading-none shrink-0 ml-4">
                    ₦{item.price.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
