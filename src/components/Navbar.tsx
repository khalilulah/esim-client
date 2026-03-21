import React from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

function Navbar() {
  const navigate = useNavigate();
  const totalItems = useCartStore((state) => state.totalItems());

  return (
    <div className="h-15 px-20 border-b-neutral-50 border-b-2 flex justify-between items-center text-xl font-bold">
      <div className="cursor-pointer" onClick={() => navigate("/")}>
        <p>Shop</p>
      </div>
      <div>Q</div>
      <div className="flex justify-between gap-6">
        <p>Search</p>
        <p
          className="cursor-pointer hover:text-neutral-500 transition-colors"
          onClick={() => navigate("/cart")}
        >
          Bag({totalItems})
        </p>
      </div>
    </div>
  );
}

export default Navbar;
