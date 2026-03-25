import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

function Navbar() {
  const navigate = useNavigate();
  const totalItems = useCartStore((state) => state.totalItems());
  const [open, setOpen] = useState(false);

  return (
    <nav className="h-15 px-4 md:px-20 border-b border-neutral-200 flex justify-between items-center text-sm relative">
      {/* Logo */}
      <Link to="/" className="font-League text-2xl uppercase leading-none">
        eSim
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        <Link
          to="/"
          className="uppercase tracking-widest text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="uppercase tracking-widest text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          About
        </Link>
        <Link
          to="/shipping"
          className="uppercase tracking-widest text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          Shipping
        </Link>
        <Link
          to="/faq"
          className="uppercase tracking-widest text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          FAQ
        </Link>
        <Link
          to="/contact"
          className="uppercase tracking-widest text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          Contact
        </Link>
        <button
          onClick={() => navigate("/cart")}
          className="uppercase tracking-widest text-xs hover:text-neutral-500 transition-colors cursor-pointer"
        >
          Bag ({totalItems})
        </button>
      </div>

      {/* Mobile — cart + hamburger */}
      <div className="flex md:hidden items-center gap-4">
        <button
          onClick={() => navigate("/cart")}
          className="uppercase tracking-widest text-xs cursor-pointer"
        >
          Bag ({totalItems})
        </button>
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex flex-col gap-1.5 cursor-pointer p-1"
        >
          <span
            className={`block w-6 h-px bg-neutral-900 transition-all ${open ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-px bg-neutral-900 transition-all ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-px bg-neutral-900 transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-neutral-200 flex flex-col px-4 py-6 gap-6 md:hidden z-50">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/shipping", label: "Shipping" },
            { to: "/faq", label: "FAQ" },
            { to: "/contact", label: "Contact" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="font-League uppercase text-2xl leading-none text-neutral-900 hover:text-neutral-500 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
