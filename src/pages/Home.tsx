import { lazy, Suspense, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import { getProducts } from "../services/product.service";
import Footer from "../components/Footer";

const ProductBrief = lazy(() => import("../components/ProductBreif"));

function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", "preview"],
    queryFn: () => getProducts({ limit: 50 }), // get enough for preview grouping
    staleTime: 30 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });
  const productRef = useRef<HTMLDivElement | null>(null);

  const products = data?.products ?? [];

  return (
    <div>
      <Navbar />

      {/* Hero */}
      <div className="relative px-6 md:px-20 py-28 overflow-hidden">
        {/* Background accent */}
        <div className="absolute -top-40 -right-40 w-[1000px] h-[900px] bg-neutral-200 rounded-full blur-3xl opacity-40" />

        {/* Main layout */}
        <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-16">
          {/* LEFT — Headline */}
          <div className="flex-1">
            <div
              className="font-League uppercase leading-none overflow-hidden"
              style={{ fontSize: "clamp(70px, 12vw, 180px)" }}
            >
              {["EMBRACE", "THE", "EXTRAORDINARY"].map((word, i) => (
                <div key={word} className="overflow-hidden">
                  <p
                    style={{
                      animation: `slideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.2}s both`,
                    }}
                  >
                    {word}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Content */}
          <div className="flex flex-col gap-8 max-w-sm">
            {/* Divider */}
            <div
              className="h-px bg-neutral-900 w-0"
              style={{
                animation:
                  "expandLine 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards",
              }}
            />

            {/* Tagline */}
            <p
              className="text-neutral-500 text-sm uppercase tracking-widest opacity-0"
              style={{ animation: "fadeIn 0.8s ease 0.8s forwards" }}
            >
              fragrance & hair care — made in Nigeria
            </p>

            {/* CTA group */}
            <div
              className="flex items-center gap-6 opacity-0"
              style={{ animation: "fadeIn 0.8s ease 1s forwards" }}
            >
              <button
                onClick={() => {
                  productRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-10 py-4 bg-black text-white text-sm uppercase tracking-widest cursor-pointer hover:bg-neutral-800 transition"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* Bottom subtle line */}
        <div
          className="mt-16 h-px bg-neutral-200 w-full opacity-0"
          style={{ animation: "fadeIn 1s ease 1.2s forwards" }}
        />

        {/* Animations */}
        <style>{`
    @keyframes slideUp {
      from { transform: translateY(100%); opacity: 0; }
      to   { transform: translateY(0); opacity: 1; }
    }

    @keyframes expandLine {
      from { width: 0; }
      to   { width: 100%; }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `}</style>
      </div>

      {/* Products */}
      <div className="mt-20">
        {isLoading && (
          <div className="flex justify-center py-20">
            <p className="uppercase tracking-widest text-sm text-neutral-400 animate-pulse">
              Loading products...
            </p>
          </div>
        )}
        {isError && (
          <div className="flex justify-center py-20">
            <p className="uppercase tracking-widest text-sm text-red-400">
              Failed to load products.
            </p>
          </div>
        )}
        {!isLoading && !isError && (
          <Suspense
            fallback={
              <div className="flex justify-center py-20">
                <p className="uppercase tracking-widest text-sm text-neutral-400 animate-pulse">
                  Loading...
                </p>
              </div>
            }
          >
            <div ref={productRef}>
              <ProductBrief products={products} />
            </div>
          </Suspense>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
