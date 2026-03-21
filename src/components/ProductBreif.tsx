import products from "../data/products.json";
import type { Product } from "../types";
import { useNavigate } from "react-router-dom";

const categories = [
  { key: "hair product", label: "Hair Product" },
  { key: "fragrance", label: "Fragrance" },
];

function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  return (
    <div
      className="group cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Image */}
      <div className="overflow-hidden bg-neutral-100 aspect-3/4">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Info */}
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
          ${product.price.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

function ProductBrief() {
  return (
    <section className="px-4 md:px-20 py-20">
      {categories.map((cat) => {
        const categoryProducts = products
          .filter((p) => p.category === cat.key)
          .slice(0, 3) as Product[];

        return (
          <div key={cat.key} className="mb-24">
            {/* Category Heading */}
            <div className="flex items-center gap-6 mb-10">
              <h2
                className="font-League uppercase leading-none shrink-0"
                style={{ fontSize: "clamp(48px, 8vw, 120px)" }}
              >
                {cat.label}
              </h2>
              <div className="h-px bg-neutral-900 w-full" />
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default ProductBrief;
