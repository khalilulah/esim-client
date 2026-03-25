import React from "react";
import { Link } from "react-router-dom";

const WHATSAPP = "2348012345678";

function Footer() {
  return (
    <footer className="border-t bg-neutral-50 border-primary-100 px-4 md:px-20 py-12 mt-20">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <div>
          <h2 className="font-League uppercase text-primary-100 hover:text-primary-50 text-3xl leading-none mb-2">
            eSim
          </h2>
          <p className="text-neutral-400 text-sm max-w-xs">
            Luxury fragrance and hair care, made with intention.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="uppercase tracking-widest text-xs text-primary-50  mb-1">
            Shop
          </p>
          <Link
            to="/"
            className="text-sm text-neutral-400 hover:text-primary-50 transition-colors"
          >
            All Products
          </Link>
          <Link
            to="/cart"
            className="text-sm text-neutral-400 hover:text-primary-50 transition-colors"
          >
            Cart
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <p className="uppercase tracking-widest text-xs text-primary-50 mb-1">
            Info
          </p>
          <Link
            to="/about"
            className="text-sm text-neutral-400 hover:text-primary-50 transition-colors"
          >
            About
          </Link>
          <Link
            to="/shipping"
            className="text-sm text-neutral-400 hover:text-primary-50 transition-colors"
          >
            Shipping
          </Link>
          <Link
            to="/returns"
            className="text-sm text-neutral-400 hover:text-primary-50 transition-colors"
          >
            Returns
          </Link>
          <Link
            to="/faq"
            className="text-sm text-neutral-400 hover:text-primary-50 transition-colors"
          >
            FAQ
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <p className="uppercase tracking-widest text-xs text-primary-50 mb-1">
            Contact
          </p>
          <Link
            to="/contact"
            className="text-sm text-neutral-400 hover:text-primary-50 transition-colors"
          >
            Contact Us
          </Link>

          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-400 hover:text-primary-50 transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-primary-50 mt-10 pt-6 flex flex-col md:flex-row justify-between gap-4">
        <p className="text-xs text-neutral-400">
          © {new Date().getFullYear()} eSim. All rights reserved.
        </p>
        <Link
          to="/returns"
          className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          Returns & Refunds Policy
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
