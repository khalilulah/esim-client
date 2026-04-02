import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getProducts } from "../services/product.service";
import type { Product } from "../types";

const LIMIT = 12;

function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  return (
    <div
      className="group cursor-pointer"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <div className="overflow-hidden bg-neutral-100 aspect-[3/4]">
        <img
          src={product.images?.[0] ?? "/placeholder.jpg"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="font-League text-xl leading-none uppercase tracking-tight">
            {product.name}
          </h3>
          <p className="text-neutral-500 text-sm mt-1 line-clamp-2 max-w-[220px]">
            {product.description}
          </p>
        </div>
        <span className="font-League text-lg leading-none shrink-0 ml-4">
          ₦{product.price.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const loaderRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", "category", category],
    queryFn: ({ pageParam }) =>
      getProducts({ page: pageParam, limit: LIMIT, category }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
    staleTime: 5 * 60 * 1000,
  });

  // Intersection Observer — fires fetchNextPage when loader div is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Flatten all pages into a single array
  const products = data?.pages.flatMap((page) => page.products) ?? [];

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="px-4 md:px-20 py-12">
        {/* Header */}
        <div className="flex items-center gap-6 mb-12">
          <h1
            className="font-League uppercase leading-none shrink-0 capitalize"
            style={{ fontSize: "clamp(48px, 8vw, 120px)" }}
          >
            {category}
          </h1>
          <div className="h-px bg-neutral-900 w-full" />
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <p className="uppercase tracking-widest text-sm text-neutral-400 animate-pulse">
              Loading...
            </p>
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div className="flex justify-center py-20">
            <p className="uppercase tracking-widest text-sm text-red-400">
              Failed to load products.
            </p>
          </div>
        )}

        {/* Products grid */}
        {!isLoading && !isError && (
          <>
            {products.length === 0 ? (
              <p className="uppercase tracking-widest text-sm text-neutral-400">
                No products found in this category.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}

            {/* Infinite scroll trigger — sits below the grid */}
            <div ref={loaderRef} className="flex justify-center py-12">
              {isFetchingNextPage && (
                <p className="uppercase tracking-widest text-sm text-neutral-400 animate-pulse">
                  Loading more...
                </p>
              )}
              {!hasNextPage && products.length > 0 && (
                <p className="uppercase tracking-widest text-sm text-neutral-400">
                  All products loaded
                </p>
              )}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default CategoryPage;
