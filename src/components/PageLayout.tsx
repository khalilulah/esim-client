import React from "react";
import Navbar from "./Navbar";

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="px-4 md:px-20 py-16 max-w-3xl">
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
    </div>
  );
}

export default PageLayout;
