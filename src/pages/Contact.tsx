import React from "react";
import PageLayout from "../components/PageLayout";

const WHATSAPP = "2348012345678";
const EMAIL = "hello@esim.com";

function Contact() {
  return (
    <PageLayout title="Contact" image="src\assets\body3.jpg">
      <p>
        We are a small team and we read every message personally. Whether you
        have a question about a product, need help with an order, or just want
        to say hello — we would love to hear from you.
      </p>

      <div className="flex flex-col gap-6">
        <div className="border border-neutral-200 p-6">
          <p className="uppercase tracking-widest text-xs text-neutral-400 mb-2">
            WhatsApp
          </p>

          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-League text-2xl uppercase text-neutral-900 hover:text-neutral-500 transition-colors"
          >
            Chat with us
          </a>
          <p className="text-sm text-neutral-400 mt-1">
            Fastest response — usually within a few hours
          </p>
        </div>

        <div className="border border-neutral-200 p-6">
          <p className="uppercase tracking-widest text-xs text-neutral-400 mb-2">
            Email
          </p>

          <a
            href={`mailto:${EMAIL}`}
            className="font-League text-2xl uppercase text-neutral-900 hover:text-neutral-500 transition-colors"
          >
            {EMAIL}
          </a>
          <p className="text-sm text-neutral-400 mt-1">
            We respond within 24 hours on business days
          </p>
        </div>

        <div className="border border-neutral-200 p-6">
          <p className="uppercase tracking-widest text-xs text-neutral-400 mb-2">
            Business Hours
          </p>
          <p className="font-League text-2xl uppercase text-neutral-900">
            Mon – Sat, 9am – 6pm
          </p>
          <p className="text-sm text-neutral-400 mt-1">
            West Africa Time (WAT)
          </p>
        </div>
      </div>
    </PageLayout>
  );
}

export default Contact;
