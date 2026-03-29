import React, { lazy, Suspense } from "react";
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
  });

  const products = data?.products ?? [];

  return (
    <div>
      <Navbar />

      {/* Hero */}
      <div
        className="px-4 md:px-20 mt-8 w-full font-League leading-none flex flex-col gap-4"
        style={{ fontSize: "clamp(60px, 18vw, 300px)" }}
      >
        <div className="flex justify-between items-center">
          <p className="-ml-1">EMBRACE</p>
          <img
            src="https://i.pinimg.com/736x/f4/28/a8/f428a8f8fcda2f0f5247f43acf1dea16.jpg"
            alt="perfume"
            className="object-cover"
            style={{
              width: "clamp(120px, 25vw, 450px)",
              height: "clamp(60px, 12.5vw, 225px)",
            }}
          />
          <p>THE</p>
        </div>

        <div className="flex justify-between items-center">
          <img
            src="https://i.pinimg.com/736x/e1/0d/e0/e10de0e5d0d9398818a33b8c21419796.jpg"
            alt="perfume"
            className="object-cover"
            style={{
              width: "clamp(40px, 8vw, 150px)",
              height: "clamp(60px, 12.5vw, 225px)",
            }}
          />
          <p>EXTRAORDINARY</p>
        </div>

        <button className="outline-2 outline-black outline-offset-4 bg-neutral-50 w-3xs h-8 sm:w-xl sm:h-12 mt-8 self-center text-[20px] sm:text-[30px] leading-normal text-primary-50 rounded-4xl cursor-pointer">
          Explore
        </button>
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
            <ProductBrief products={products} />
          </Suspense>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
