import React from "react";
import Navbar from "./Navbar";

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
  image?: string; // or ReactNode if you want more flexibility
}

export default function PageLayout({
  title,
  children,
  image,
}: PageLayoutProps) {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="flex">
        {/* LEFT — Content */}
        <div className="flex-1 px-4 md:px-20 py-16 max-w-3xl">
          <h1
            className="font-League uppercase leading-none mb-12"
            style={{ fontSize: "clamp(40px, 7vw, 100px)" }}
          >
            {title}
          </h1>

          <div className="flex flex-col gap-8 text-neutral-600 leading-relaxed">
            {children}
          </div>
        </div>

        {/* RIGHT — Image (only large screens) */}
        {image && (
          <div className="hidden lg:flex flex-1 justify-center py-16">
            <div className="relative w-[75%] h-[75%] border border-neutral-300 p-4">
              <div className="w-full h-full overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-700"
                />
              </div>

              {/* subtle offset background */}
              <div className="absolute -z-10 top-6 left-6 w-full h-full border border-neutral-200" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
