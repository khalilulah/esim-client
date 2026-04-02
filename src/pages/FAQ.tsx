import bodyImage from "../assets/body3.jpg";
import { useState } from "react";
import Navbar from "../components/Navbar";

const faqs = [
  {
    q: "Do I need an account to place an order?",
    a: "No. You can checkout as a guest — just provide your contact and delivery details at checkout. No account required.",
  },
  {
    q: "How long does delivery take?",
    a: "Orders are processed within 1–2 business days. Delivery within Nigeria typically takes 2–5 business days depending on your location.",
  },
  {
    q: "Are your fragrances long lasting?",
    a: "Yes. Our fragrances are formulated with a high concentration of fragrance oil for longevity on the skin. Application on moisturised skin further extends the scent.",
  },
  {
    q: "Are your hair products suitable for all hair types?",
    a: "Our hair products are formulated to work across a range of hair textures, with a focus on natural and chemically treated hair. Each product page includes details on who it is best suited for.",
  },
  {
    q: "Can I change or cancel my order?",
    a: "Contact us as soon as possible via WhatsApp if you need to change or cancel your order. We can make changes before your order is dispatched, but cannot make changes once it has shipped.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept card payments (Visa, Mastercard, Verve) and bank transfers via Paystack. Your payment details are never stored on our servers.",
  },
  {
    q: "My item arrived damaged — what do I do?",
    a: "We are sorry to hear that. Please contact us within 48 hours of delivery with your order ID and a photo of the damaged item and we will sort it out immediately.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-neutral-200">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex justify-between items-center py-6 text-left cursor-pointer group"
      >
        <span className="font-League uppercase text-lg text-neutral-900 group-hover:text-neutral-500 transition-colors">
          {q}
        </span>
        <span className="text-2xl leading-none text-neutral-400 shrink-0 ml-4">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && <p className="text-neutral-600 leading-relaxed pb-6">{a}</p>}
    </div>
  );
}

function FAQ() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        <div className="flex-1 px-4 md:px-20 py-16 max-w-3xl">
          <h1
            className="font-League uppercase leading-none mb-12"
            style={{ fontSize: "clamp(40px, 7vw, 100px)" }}
          >
            FAQ
          </h1>
          <div>
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
        <div className="hidden lg:flex flex-1 justify-center py-16">
          <div className="relative w-[75%] h-[75%] border border-neutral-300 p-4">
            <div className="w-full h-full overflow-hidden">
              <img
                src={bodyImage}
                alt="image"
                className="w-full h-full object-cover hover:scale-105 transition duration-700"
              />
            </div>

            {/* subtle offset background */}
            <div className="absolute -z-10 top-6 left-6 w-full h-full border border-neutral-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
